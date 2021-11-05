const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const Character = require('../models/Character.js');
const Room = require('../models/Room.js');
const Chat = require('../models/Chat.js');
const TicketCode = require('../models/TicketCode.js');

router.post('/user2mod/:uid', (req, res, next) => {
  const opt = { isMod: true };
  User.findByIdAndUpdate(req.body.userid, opt, (err, user) => {
    if (err) return next(err);
    req.app.io.emit('user-2-mod', { message: user });
    return res.json(user);
  });
});

router.post('/mod2user/:uid', (req, res, next) => {
  const opt = { isMod: false };
  User.findByIdAndUpdate(req.body.userid, opt, (err, user) => {
    if (err) return next(err);
    req.app.io.emit('mod-2-user', { message: user });
    return res.json(user);
  });
});

router.get('/', (req, res, next) => {
  User.find()
    .populate('character')
    .exec((err, users) => {
      if (err) return next(err);
      return res.json(users);
  });
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return next(err);
    return res.json(user);
  });
});

router.post('/', (req, res, next) => {
  if (!req.body.providedTicketCode || req.body.providedTicketCode === "") {
    return res.json({ message: `Empty code`});
  } else {
    Promise.all([
      TicketCode.find({ code: req.body.providedTicketCode}).exec()
    ]).then(values => {
      const codes = values[0];
      if (codes.length === 0) return res.json({ message: `Invalid code`});
      if (codes[0].used) return res.json({ message: `Code expired`});

      let fullUser = req.body;
      fullUser.ticketCodeId = codes[0]._id;
      User.create(fullUser, (err, user) => {
        if (err) return next(err);
        TicketCode.findByIdAndUpdate(codes[0]._id, {used: true, usedBy: user._id})
          .exec();
        req.app.io.emit('new-user', { message: user });
        return res.json(user);
      });
    }).catch(e => {
      return req.log.error(e);
    });
  }
});

router.put('/:id', (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    return res.json(post);
  });
});

router.delete('/:id', (req, res, next) => {

  Promise.all([
    Character.find({ user: req.params.id }).exec(),
    User.findByIdAndRemove(req.params.id, req.body).exec(),
    Room.find({ main: true, locked: false}).exec(),
  ]).then(values => {
    let user = values[1];
    let character = values[0][0];
    let room = values[2][0];

    Chat.create({ message: `${character.name} ist raus!`,
                  room: room._id,
                  created_date: new Date()},
                (err, chat) => {
                  if (err) return next(err);
                  req.app.io.emit('delete-user', { message: user });
                  req.app.io.emit('new-message', { message: chat });
                  return res.json(user);
                });
  }).catch(e => {
    return res.next(e);
  });
});

module.exports = router;
