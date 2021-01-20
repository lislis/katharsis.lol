const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat.js');

router.get('/', (req, res, next) => {
  Chat.find((err, chats) => {
    if (err) return next(err);
    res.json(chats);
  });
});

router.get('/:roomid', (req, res, next) => {
  Chat.find({ room: req.params.roomid })
      .populate('user')
      .exec((err, chats) => {
        if (err) return next(err);
        res.json(chats);
      });
});

router.get('/:id', (req, res, next) => {
  Chat.findById(req.params.id, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/', (req, res, next) => {
  Chat.create(req.body, (err, post) => {
    if (err) return next(err);
    req.app.io.emit('new-message', { message: post });
    res.json(post);
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
