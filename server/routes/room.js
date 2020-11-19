var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Room = require('../models/Room.js');

/* GET ALL ROOMS */
router.get('/', function(req, res, next) {
  Room.find(function (err, rooms) {
    if (err) return next(err);
    res.json(rooms);
  });
});

/* GET MAIN ROOM aka Foyer */
router.get('/main', function(req, res, next) {
    Room.find({ main: true }, function (err, rooms) {
        if (err) return next(err);
        res.json(rooms);
    });
});

/* GET SINGLE ROOM BY ID */
router.get('/:id', function(req, res, next) {
  Room.findById(req.params.id, function (err, room) {
    if (err) return next(err);
    res.json(room);
  });
});

/* SAVE ROOM */
router.post('/', function(req, res, next) {
  Room.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE ROOM */
router.put('/:id', function(req, res, next) {
  Room.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE ROOM */
router.delete('/:id', function(req, res, next) {
  Room.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
