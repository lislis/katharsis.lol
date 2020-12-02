var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Direction = require('../models/Direction.js');

router.get('/bytype/:type', function(req, res, next) {
    Direction
        //.find({ type: req.param.type })
        .aggregate([
            { $match: { type: req.params.type }},
            { $sample: {size: 1}}
        ])
        .exec((err, directions) => {
            if (err) return next(err);
            res.json(directions)
        });
});

// all the
router.get('/', function(req, res, next) {
    Direction.find(function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET SINGLE CHAT BY ID */
router.get('/:id', function(req, res, next) {
    Direction.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE CHAT */
router.post('/', function(req, res, next) {
    Direction.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE CHAT */
router.put('/:id', function(req, res, next) {
    Direction.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE CHAT */
router.delete('/:id', function(req, res, next) {
    Direction.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
