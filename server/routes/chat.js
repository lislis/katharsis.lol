const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
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
    User.findById(req.body.user, (err, user) => {
        if (err) return next(err);
        if (user !== null) {
            let body = req.body;
            if (body.bot) {
                delete body.user;
            }

            Chat.create(body, (err, post) => {
                if (err) return next(err);
                req.app.io.emit('new-message', { message: post });
                res.json(post);
            });
        } else {
            req.app.io.emit('delete-user', { message: { '_id': req.body.user} });
            res.json({});
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
