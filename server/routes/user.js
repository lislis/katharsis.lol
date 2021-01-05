const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User.js');
const Chat = require('../models/Chat.js');
const Room = require('../models/Room.js');

router.put('/on/:uid', async function(req, res, next) {
  const opt = { hasPermission: true };

  Promise.all([
    Room.find({ main: true, locked: false}).exec(),
    User.findByIdAndUpdate(req.params.uid, opt).exec()
  ]).then(async values => {
    let room  = values[0][0];
    let user = values[1]

    Chat.create({ message: `${user.nickname} auf die Bühne!`,
                  room: room._id,
                  created_date: new Date()},
                function(err, chat) {
                  if (err) return next(err);
                  req.app.io.emit('user-to-stage', { message: user });
                  req.app.io.emit('new-message', { message: chat });
                  res.json(user)
    })
  }).catch(e => e.stack);
});

router.put('/off/:uid', async function(req, res, next) {
  const opt = { hasPermission: false };
  try {
    Promise.all([
      Room.find({ main: true, locked: false}).exec(),
      User.findByIdAndUpdate(req.params.uid, opt).exec()
    ]).then(async values => {
      let room  = values[0][0];
      let user = values[1]

      Chat.create({ message: `${user.nickname} runter von der Bühne!`,
                    room: room._id,
                    created_date: new Date()},
                  function(err, chat) {
                    if (err) return next(err);
                    req.app.io.emit('user-to-stage', { message: user });
                    req.app.io.emit('new-message', { message: chat });
                    res.json(user)
      })
    });
  } catch(e) {
    e.stack;
  }
});

router.post('/user2mod/:uid', async (req, res, next) => {
    const opt = { isMod: true };
    console.log(req.body);
    console.log(req.params);
    let user = User.findByIdAndUpdate(req.body.userid, opt, (err, user) => {
        if (err) return next(err);
        res.json(user);
    });
});

router.post('/mod2user/:uid', async (req, res, next) => {
    const opt = { isMod: false };
    let user = User.findByIdAndUpdate(req.body.userid, opt, (err, user) => {
        if (err) return next(err);
        res.json(user);
    });
});

/* GET ALL USERS */
router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* GET SINGLE USER BY ID */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

/* SAVE USER */
router.post('/', function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE USER */
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE USER */
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
