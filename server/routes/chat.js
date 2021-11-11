const express = require('express');
const router = express.Router();
//const User = require('../models/User.js');
const Character = require('../models/Character.js');
const Chat = require('../models/Chat.js');

router.get('/', (req, res, next) => {
  Chat.find()
    //.populate('character')
    .exec((err, chats) => {
    if (err) return next(err);
    return res.json(chats);
  });
});

router.get('/:roomid', (req, res, next) => {
  Chat.find({ room: req.params.roomid })
    .populate('user')
    .populate('character')
    .exec((err, chats) => {
      if (err) return next(err);
      return res.json(chats);
    });
});

router.get('/:id', (req, res, next) => {
  Chat.findById(req.params.id, (err, post) => {
    if (err) return next(err);
    return res.json(post);
  });
});

router.post('/', (req, res, next) => {
  Character.findById(req.body.character, (err, char) => {
    if (err) return next(err);
    if (char !== null) {
      let body = req.body;
      if (body.bot) {
        delete body.user;
        delete body.character;
      }
      Chat.create(body, (err, post) => {
        if (err) return next(err);
        req.app.io.emit('new-message', { message: post });
        return res.json(post);
      });
    } else {
      req.app.io.emit('delete-character', { message: { '_id': req.body.user} });
      return res.json({});
    }
  });
});

router.put('/:id', (req, res, next) => {
  Chat.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', (req, res, next) => {
  Chat.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    req.app.io.emit('delete-message', { message: post });
    res.json(post);
  });
});

module.exports = router;
