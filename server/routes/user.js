var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var Chat = require('../models/Chat.js');

router.put('/on/:uid', function(req, res, next) {
    const opt = { hasPermission: true };
    User.findByIdAndUpdate(req.params.uid, opt, function(err, user) {
        if (err) return next(err);
        console.log('new-message, user on stage ', user);

        Chat.create({message: `${user.nickname} auf die Bühne!`,
                     room: '5fb5a6cca803b92aa8c9c263'}, function(err, chat) {
            if (err) return next(err);
            req.app.io.emit('user-to-stage', { message: user });
            res.json(user)
        });
    });
});

router.put('/off/:uid', function(req, res, next) {
    const opt = { hasPermission: false };
    User.findByIdAndUpdate(req.params.uid, opt, function(err, user) {
        if (err) return next(err);
        console.log('new-message user off stage', user);

        Chat.create({message: `${user.nickname} auf die Bühne!`,
                     room: '5fb5a6cca803b92aa8c9c263'}, function(err, chat) {
            if (err) return next(err);
            req.app.io.emit('user-off-stage', { message: user });
            res.json(user)
        });
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
