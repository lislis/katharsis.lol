const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Room = require('../models/Room.js');

router.get('/', function(req, res, next) {
  Room.find(function (err, rooms) {
    if (err) return next(err);
    res.json(rooms);
  });
});

router.get('/main', function(req, res, next) {
    Room.find({ main: true }, function (err, rooms) {
        if (err) return next(err);
        res.json(rooms);
    });
});

router.get('/:id', function(req, res, next) {
  Room.findById(req.params.id, function (err, room) {
    if (err) return next(err);
    res.json(room);
  });
});

router.post('/', function(req, res, next) {
  Room.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', function(req, res, next) {
  Room.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', function(req, res, next) {
  Room.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
