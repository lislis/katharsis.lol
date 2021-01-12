const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Room = require('../models/Room.js');

router.get('/', (req, res, next) => {
  Room.find((err, rooms) => {
    if (err) return next(err);
    res.json(rooms);
  });
});

router.get('/main', (req, res, next) => {
    Room.find({ main: true }, (err, rooms) => {
        if (err) return next(err);
        res.json(rooms);
    });
});

router.get('/:id', (req, res, next) => {
  Room.findById(req.params.id, (err, room) => {
    if (err) return next(err);
    res.json(room);
  });
});

router.post('/', (req, res, next) => {
  Room.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', (req, res, next) => {
  Room.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', (req, res, next) => {
  Room.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
