require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const Character = require('../models/Character.js');
const Chat = require('../models/Chat.js');
const Room = require('../models/Room.js');
const axios = require('axios');
const random = require('random');

const { replacePatternWUsers } = require('../lib/brain.js');
const { returnEmbedWId } = require('../lib/platform_embeds.js');
const BOTBRAIN = process.env['BOTBRAIN'];

router.post('/onstage', (req, res, next) => {
  Promise.all([
    Room.find({ main: true, locked: false}).exec(),
    Character.find({ hasPermission: false }).populate('user').exec()
  ]).then(async values => {
    let room  = values[0][0];
    if (values[1].length > 0) {
      let characters = values[1]
          .filter(x => x.user)
          .filter(x => {
            return !x.user.isMod;
          });

      if (characters.length <= 0) return res.json({ message: 'nobody to put on stage'});

      let char = characters[random.int(0, characters.length -1)];
      if (char.name) {
        char.update({hasPermission: true}).exec();

        let chatMsg = { message: `${char.name} auf die Bühne!`,
                        room: room._id,
                        created_date: new Date()
        };
        Chat.create(chatMsg, (err, chat) => {
          if (err) return next(err);
          req.app.io.emit('character-to-stage', { message: char });
          req.app.io.emit('new-message', { message: chat });
          return res.json(char);
        });
      } else {
        return res.json({message: 'user not actually valid'});
      }
    } else {
      return res.json({message: 'could not find valid users'});
    }
  }).catch(e => next(e));
});

router.post('/offstage', (req, res, next) => {
  Promise.all([
    Room.find({ main: true, locked: false}).exec(),
    Character.find({ hasPermission: true }).populate('user').exec()
  ]).then(values => {
    let room  = values[0][0];

    if (values[1].length > 0) {
      let characters = values[1]
          .filter(x => x.user)
          .filter(x => !x.user.isMod);
      let char = characters[random.int(0, characters.length -1)];

      if (char.name) {
        char.update({ hasPermission: false }).exec();

        let chatMsg = { message: `${char.name} runter von der Bühne!`,
                        room: room._id,
                        created_date: new Date()
        };
        Chat.create(chatMsg, (err, chat) => {
          if (err) return next(err);
          req.app.io.emit('character-off-stage', { message: char });
          req.app.io.emit('new-message', { message: chat });
          return res.json(char);
        });
      }
    } else {
      return res.json({message: 'could not find valid users'});
    }
  }).catch(e => next(e));
});

router.post('/bulkOffStage', (req, res, next) => {
    Promise.all([
        Room.find({ main: true, locked: false}).exec(),
        Character.find({ hasPermission: true }).exec()
    ]).then(values => {
        let room  = values[0][0];
        if (values[1].length > 0) {
            let characters = values[1];
            Promise.all(
                characters.map((c) => {
                    c.update({ hasPermission: false }).exec();
                })).then(userValues => {
                    let chatMsg = { message: `Alle runter von der Bühne!`,
                                    room: room._id,
                                    created_date: new Date()
                                  };
                    Chat.create(chatMsg, (err, chat) => {
                        if (err) return next(err);
                        req.app.io.emit('characters-all-off-stage');
                        req.app.io.emit('new-message', { message: chat });
                        res.json(userValues);
                    });
                }).catch(e => req.log.error(e));
        }  else {
            res.json({message: 'Nobody to kick'});
        }
    }).catch(e => req.log.error(e));
});


router.post('/cleanStage', (req, res, next) => {
  Promise.all([
    Room.find({main: true, locked: true}).exec()
  ]).then(values => {
    let room = values[0][0];
    Chat.deleteMany({room: room._id}, (err, msg) => {
      if (err) return next(err);
      req.app.io.emit('clear-stage', { message: room });
      res.json({message: "Cleared stage " + msg});
    })
  }).catch(e => req.log.error(e));
});

router.post('/cleanEverything', (req, res, next) => {
  Chat.deleteMany((err, msg) => {
    if (err) return next(err);
    req.app.io.emit('clear-everything', { message: ""});
    res.json({message: "Cleared chats " + msg});
  });
});

router.post('/category', (req, res, next) => {
  let param = '';
  if (req.body.numerus && req.body.numerus !== '') {
    param = `?numerus=${req.body.numerus}`;
  }

  Promise.all([
    Room.find({main: true, locked: true}).exec(),
    axios.get(`${BOTBRAIN}/api/direction/bytype/${req.body.category}${param}`),
    Character.find({ hasPermission: true }).populate('user').exec()
  ]).then(values => {
    let room = values[0][0];
    let botMsg = values[1].data[0];

    let userPool = values[2]
        .filter(x => x.user)
        .filter(x => !x.user.isMod);

    let msgWUsers = replacePatternWUsers(botMsg, userPool);

    if (botMsg !== null && botMsg !== "") {
      let chatMsg = { message: msgWUsers,
                      room: room._id,
                      bot: true
      };

      Chat.create(chatMsg, (err, msg) => {
        if (err) return next(err);
        req.app.io.emit('new-message', { message: msg });
        return res.json(msg);
      });
    } else {
      return res.json({mesage: `Nothing matched category ${req.body.category}, skipping`});
    }
  }).catch(e => {
    req.log.error(e);
    return next(e);
  });
});

router.post('/embed', (req, res, next) => {
  Promise.all([
    Room.find({main: true, locked: true}).exec()
  ]).then(values => {
    const room = values[0][0];
    const embedCode = returnEmbedWId(req.body.platform, req.body.id);
    const chatMsg = { message: embedCode,
                      room: room._id,
                      bot: true
    };

    Chat.create(chatMsg, (err, msg) => {
      if (err) return next(err);
      req.app.io.emit('new-message', { message: msg });
      res.json(msg);
    });
  }).catch(e => req.log.error(e));
});

router.post('/theend', (req, res, next) => {
  Promise.all([
    Room.find({main: true, locked: true}).exec(),
    Character.updateMany({ hasPermission: true }, { hasPermission: false }).exec()
  ]).then(values => {
    let room = values[0][0];
    let chatMsg = { message: "KATHARSIS.LOL - The end",
                    room: room._id,
                    bot: true
    };
    Chat.create(chatMsg, (err, msg) => {
      if (err) return next(err);
      req.app.io.emit('new-message', { message: msg });
      res.json(msg);
    });
  }).catch(e => req.log.error(e));
});

module.exports = router;
