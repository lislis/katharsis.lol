require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User.js');
const Chat = require('../models/Chat.js');
const Room = require('../models/Room.js');
const axios = require('axios');
const random = require('random');

const BOTBRAIN = process.env['BOTBRAIN'];

router.post('/onstage', (req, res, next) => {
    Promise.all([
        Room.find({ main: true, locked: false}).exec(),
        User.find({ hasPermission: false, isMod: false }).exec()
    ]).then(async values => {
        let room  = values[0][0];
        if (values[1].length > 0) {
            let user = values[1][random.int(0, values[1].length -1)];

            if (user.nickname) {
                user.update({hasPermission: true}).exec();

                let chatMsg = { message: `${user.nickname} auf die Bühne!`,
                                room: room._id,
                                created_date: new Date()
                              };
                Chat.create(chatMsg, (err, chat) => {
                    if (err) return next(err);
                    req.log.info(chat);
                    req.app.io.emit('user-to-stage', { message: user });
                    req.app.io.emit('new-message', { message: chat });
                    res.json(user);
                })
            } else {
                res.json({message: 'user not actually valid'});
            }
        } else {
            res.json({message: 'could not find valid users'});
        }
    }).catch(e => req.log.error(e));
});

router.post('/offstage', (req, res, next) => {
    Promise.all([
        Room.find({ main: true, locked: false}).exec(),
        User.find({ hasPermission: true, isMod: false }).exec()
    ]).then(values => {
        let room  = values[0][0];

        if (values[1].length > 0) {
            let user = values[1][random.int(0, values[1].length -1)];

            if (user.nickname) {
                user.update({ hasPermission: false }).exec();

                let chatMsg = { message: `${user.nickname} runter von der Bühne!`,
                                room: room._id,
                                created_date: new Date()
                              };
                Chat.create(chatMsg, (err, chat) => {
                    if (err) return next(err);
                    req.log.info(chat);
                    req.app.io.emit('user-to-stage', { message: user });
                    req.app.io.emit('new-message', { message: chat });
                    res.json(user);
                });
            }
        } else {
            req.log.info('No user available to put on stage');
            res.json({message: 'could not find valid users'});
        }
    }).catch(e => req.log.error(e));
});

router.post('/cleanStage', (req, res, next) => {
    Promise.all([
        Room.find({main: true, locked: true}).exec()
    ]).then(values => {
        let room = values[0][0];
        Chat.deleteMany({room: room._id}, (err, msg) => {
            req.log.info('Stage cleared');
            res.json({message: "Cleared stage"})
        })
    }).catch(e => req.log.error(e));
})

router.post('/category', (req, res, next) => {
    let param = '';
    if (req.body.numerus && req.body.numerus !== '') {
        param = `?numerus=${req.body.numerus}`;
    }

    Promise.all([
        Room.find({main: true, locked: true}).exec(),
        axios.get(`${BOTBRAIN}/api/direction/bytype/${req.body.category}${param}`)
    ]).then(values => {
        let room = values[0][0];
        let botMsg = values[1].data[0];

        if (botMsg !== null && botMsg !== "") {
            let chatMsg = { message: botMsg,
                            room: room._id,
                            bot: true
                          };

            Chat.create(chatMsg, (err, msg) => {
                if (err) return next(err);
                req.log.info('new-message', msg);
                req.app.io.emit('new-message', { message: msg });
                res.json(msg);
            });
        } else {
            res.json({mesage: `Nothing matched category ${req.body.category}, skipping`});
        }
    }).catch(e => req.log.error(e));
});

router.post('/theend', (req, res, next) => {
    Promise.all([
        Room.find({main: true, locked: true}).exec()
    ]).then(values => {
        let room = values[0][0];
        let chatMsg = { message: "KATHARSIS.LOL - The end",
                        room: room._id,
                        bot: true
                      };
        Chat.create(chatMsg, (err, msg) => {
            if (err) return next(err);
            req.log.info('new-message', msg);
            req.app.io.emit('new-message', { message: msg });
            res.json(msg);
        });
    }).catch(e => req.log.error(e));;
});

module.exports = router;
