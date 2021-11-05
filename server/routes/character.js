const express = require('express');
const router = express.Router();
const Character = require('../models/Character.js');
const User = require('../models/User.js');
const Room = require('../models/Room.js');
const Chat = require('../models/Chat.js');

router.post('/on/:uid', (req, res, next) => {
  const opt = { hasPermission: true };

  Promise.all([
    Room.find({ main: true, locked: false}).exec(),
    Character.findByIdAndUpdate(req.params.uid, opt).exec()
  ]).then(values => {
    let room  = values[0][0];
    let character = values[1];

    Chat.create({ message: `${character.name} auf die Bühne!`,
                  room: room._id,
                  created_date: new Date()},
                (err, chat) => {
                  if (err) return next(err);
                  req.app.io.emit('character-to-stage', { message: character });
                  req.app.io.emit('new-message', { message: chat });
                  return res.json(character);
                });
  }).catch(e => req.log.error(e));
});

router.post('/off/:uid', (req, res, next) => {
  const opt = { hasPermission: false };
  Promise.all([
    Room.find({ main: true, locked: false}).exec(),
    Character.findByIdAndUpdate(req.params.uid, opt).exec()
  ]).then(values => {
    let room  = values[0][0];
    let character = values[1];

    Chat.create({ message: `${character.name} runter von der Bühne!`,
                  room: room._id,
                  created_date: new Date()},
                (err, chat) => {
                  if (err) return next(err);
                  req.app.io.emit('character-to-stage', { message: character });
                  req.app.io.emit('new-message', { message: chat });
                  return res.json(character);
                }).catch(e => req.log.error(e));
  });
});

router.get('/', (req, res, next) => {
  Character.find()
    .populate('user')
    .exec((err, characters) => {
    if (err) return next(err);
    return res.json(characters);
  });
});

router.get('/:id', (req, res, next) => {
  Character.findById(req.params.id, (err, character) => {
    if (err) return next(err);
    return res.json(character);
  });
});

router.post('/', (req, res, next) => {
  Character.create(req.body, (err, character) => {
    if (err) return next(err);

    Promise.all([
      User.findByIdAndUpdate(req.body.user, { "character": character._id }).exec(),
      Room.find({ main: true, locked: false}).exec(),
    ]).then(values => {
      let room = values[1][0];

      Chat.create({ message: `${character.name} ist neu hier!`,
                    room: room._id,
                    created_date: new Date()},
                  (err, chat) => {
                    if (err) return next(err);
                    req.app.io.emit('new-character', { message: character });
                    req.app.io.emit('new-message', { message: chat });
                    return res.json(character);
                  });
    }).catch(e => {
      return next(e);
    });
  });
});

router.put('/:id', (req, res, next) => {
  Character.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    return res.json(post);
  });
});

router.delete('/:id', (req, res, next) => {
  Character.findByIdAndRemove(req.params.id, req.body, (err, character) => {
    if (err) return next(err);
    req.app.io.emit('delete-character', { message: character });
    return res.json(character);
  });
});

module.exports = router;
