const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { runWordParser } = require('../lib/csvparser.js');
const Word = require('../models/Word.js');

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

router.post('/bulkimport', (req, res, next) => {
    if (req.body.hasOwnProperty('csvUrl') && req.body.csvUrl !== '') {
        runWordParser(req.body.csvUrl).then(datas => {
            Promise.all(
                datas.map(data => Word.create(data))
            ).then(_ => {
                res.json({ message: "Word import finished!" });
            });
        });
    } else {
        res.json({ message: "No url to csv given" });
    }
});

router.get('/', function(req, res, next) {
    Word.find(function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.get('/:id', function(req, res, next) {
    Word.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.post('/', function(req, res, next) {
    Word.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.put('/:id', function(req, res, next) {
    Word.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.delete('/:id', function(req, res, next) {
    Word.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
