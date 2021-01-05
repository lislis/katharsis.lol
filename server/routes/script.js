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

router.post('/onstage', function(req, res, next) {
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
                Chat.create(chatMsg, function(err, chat) {
                    if (err) return next(err);
                    req.app.io.emit('user-to-stage', { message: user });
                    req.app.io.emit('new-message', { message: chat });
                    res.json(user);
                });
            } else {
                res.json({message: 'user not actually valid'});
            }
        } else {
            res.json({message: 'could not find valid users'});
        }
    }).catch(e => e.stack);
});

router.post('/offstage', function(req, res, next) {
    Promise.all([
        Room.find({ main: true, locked: false}).exec(),
        User.find({ hasPermission: true, isMod: false }).exec()
    ]).then(async values => {
        let room  = values[0][0];

        if (values[1].length > 0) {
            let user = values[1][random.int(0, values[1].length -1)];

            if (user.nickname) {
                user.update({ hasPermission: false }).exec();

                let chatMsg = { message: `${user.nickname} runter von der Bühne!`,
                                room: room._id,
                                created_date: new Date()
                              };
                Chat.create(chatMsg, function(err, chat) {
                    if (err) return next(err);
                    req.app.io.emit('user-to-stage', { message: user });
                    req.app.io.emit('new-message', { message: chat });
                    res.json(user);
                });
            }
        } else {
            res.json({message: 'could not find valid users'});
        }
    }).catch(e => e.stack);
});

router.post('/cleanStage', function(req, res, next) {
    Promise.all([
        Room.find({main: true, locked: true}).exec()
    ]).then(values => {
        let room = values[0][0];

        Chat.deleteMany({room: room._id}, function(err, msg) {

            res.json({message: "Cleared stage"})
        })
    }).catch(e => e.stack);
})

router.post('/category', function(req, res, next) {
    Promise.all([
        Room.find({main: true, locked: true}).exec(),
        axios.get(`${BOTBRAIN}/api/direction/bytype/${req.body.category}`)
    ]).then(values => {
        let room = values[0][0];
        let botMsg = values[1].data[0];

        console.log("bot says, ", botMsg)
        if (botMsg !== null && botMsg !== "") {
            let chatMsg = { message: botMsg,
                            room: room._id,
                            bot: true
                          };

            console.log("chat message is:  ", chatMsg);

            Chat.create(chatMsg, function (err, msg) {
                if (err) return next(err);
                console.log('new-message', msg);
                req.app.io.emit('new-message', { message: msg });
                res.json(msg);
            });
        } else {
            res.json({mesage: `Nothing matched category ${req.body.category}, skipping`})
        }
    }).catch(e => console.log(e));
});

module.exports = router;
