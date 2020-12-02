var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Word = require('../models/Word.js');

router.get('/bytype/:type', function(req, res, next) {
    Word
        .aggregate([
            { $match: { word_btype: req.params.type }},
            { $sample: {size: 1}}
        ])
        .exec((err, directions) => {
            if (err) return next(err);

            res.json(directions)
        });
});




// all the
router.get('/', function(req, res, next) {
    Word.find(function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET SINGLE CHAT BY ID */
router.get('/:id', function(req, res, next) {
    Word.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE CHAT */
router.post('/', function(req, res, next) {
    Word.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE CHAT */
router.put('/:id', function(req, res, next) {
    Word.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE CHAT */
router.delete('/:id', function(req, res, next) {
    Word.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
