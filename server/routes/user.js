const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const Chat = require('../models/Chat.js');
const Room = require('../models/Room.js');
const TicketCode = require('../models/TicketCode.js');

router.post('/on/:uid', (req, res, next) => {
  const opt = { hasPermission: true };

  Promise.all([
    Room.find({ main: true, locked: false}).exec(),
    User.findByIdAndUpdate(req.params.uid, opt).exec()
  ]).then(values => {
    let room  = values[0][0];
    let user = values[1]

    Chat.create({ message: `${user.nickname} auf die Bühne!`,
                  room: room._id,
                  created_date: new Date()},
                (err, chat) => {
                  if (err) return next(err);
                  req.app.io.emit('user-to-stage', { message: user });
                  req.app.io.emit('new-message', { message: chat });
                  res.json(user)
    })
  }).catch(e => req.log.error(e));
});

router.post('/off/:uid', (req, res, next) => {
  const opt = { hasPermission: false };
  Promise.all([
    Room.find({ main: true, locked: false}).exec(),
    User.findByIdAndUpdate(req.params.uid, opt).exec()
  ]).then(values => {
    let room  = values[0][0];
    let user = values[1]

    Chat.create({ message: `${user.nickname} runter von der Bühne!`,
                  room: room._id,
                  created_date: new Date()},
                (err, chat) => {
                  if (err) return next(err);
                  req.app.io.emit('user-to-stage', { message: user });
                  req.app.io.emit('new-message', { message: chat });
                  res.json(user)
    }).catch(e => req.log.error(e));
  });
});

router.post('/user2mod/:uid', (req, res, next) => {
  const opt = { isMod: true };
  User.findByIdAndUpdate(req.body.userid, opt, (err, user) => {
    if (err) return next(err);
    req.app.io.emit('user-2-mod', { message: user });
    res.json(user);
  });
});

router.post('/mod2user/:uid', (req, res, next) => {
  const opt = { isMod: false };
  User.findByIdAndUpdate(req.body.userid, opt, (err, user) => {
    if (err) return next(err);
    req.app.io.emit('mod-2-user', { message: user });
    res.json(user);
  });
});

router.get('/', (req, res, next) => {
  User.find((err, users) => {
    if (err) return next(err);
    res.json(users);
  });
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return next(err);
    res.json(user);
  });
});

router.post('/', (req, res, next) => {
  console.log('\n\n', req.body)


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
        TicketCode.findByIdAndUpdate(codes[0]._id, {used: true, usedBy: user._id}).exec();
        req.app.io.emit('new-user', { message: user });
        res.json(user);
      });
    }).catch(e => {
      req.log.error(e);
    })
  }
});

router.put('/:id', (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id, req.body, (err, user) => {
    if (err) return next(err);
    req.app.io.emit('delete-user', { message: user });
    res.json(user);
  });
});

module.exports = router;
