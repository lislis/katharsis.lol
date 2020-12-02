var utils = require('../lib/utils.js');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Direction = require('../models/Direction.js');
var Word = require('../models/Word.js');
var User = require('../models/User.js');

router.get('/bytype/:type', async function(req, res, next) {
    try {
        Promise.all([
            Word.find().exec(),
            User.find().exec()
        ]).then(async values => {
            Direction
                .aggregate([
                    { $match: { direction_type: req.params.type }},
                    { $sample: {size: 1}}
                ]).exec((err, direction) => {
                    if (err) return next(err);
                    let newDirections = utils.fillPlaceholders(direction[0], values);
                    res.json(newDirections);
                });
        })
    } catch(e) {
        e.stack;
    }
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
