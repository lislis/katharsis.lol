var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Chat = require('../models/Chat.js');


/* GET ALL CHATS */
router.get('/:roomid', function(req, res, next) {
  Chat.find({ room: req.params.roomid }, function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE CHAT BY ID */
router.get('/:id', function(req, res, next) {
  Chat.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE CHAT */
router.post('/', function(req, res, next) {
  Chat.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE CHAT */
router.put('/:id', function(req, res, next) {
  Chat.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE CHAT */
router.delete('/:id', function(req, res, next) {
  Chat.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
