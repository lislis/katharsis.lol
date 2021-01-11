const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const logger = require('pino');

const { runDirectionParser } = require('../lib/csvparser.js');
const utils = require('../lib/utils.js');

const Direction = require('../models/Direction.js');
const Word = require('../models/Word.js');
const User = require('../models/User.js');

router.get('/bytype/:type', async function(req, res, next) {
    try {
        Promise.all([
            Word.find().exec(),
            User.find({ hasPermission: true }).exec()
        ]).then(async values => {
            Direction
                .aggregate([
                    { $match: { direction_type: req.params.type }},
                    { $sample: {size: 1}}
                ]).exec((err, direction) => {
                    if (err) return next(err);

                    //console.log(values)
                    let newDirections = utils.fillPlaceholders(direction, values, req.query);
                    //console.log(newDirections)
                    res.json(newDirections);
                });
        })
    } catch(e) {
        e.stack;
    }
});

router.get('/any', async function(req, res, next) {
    try {
        Promise.all([
            Word.find().exec(),
            User.find({ hasPermission: true }).exec()
        ]).then(async values => {
            Direction
                .aggregate([{ $sample: {size: 1}}])
                .exec((err, direction) => {
                    if (err) return next(err);
                    let newDirections = utils.fillPlaceholders(direction, values, req.query);
                    res.json(newDirections);
                });
        })
    } catch(e) {
        e.stack;
    }
});

router.post('/bulkimport', (req, res, next) => {
    try {
        if (req.body.hasOwnProperty('csvUrl') && req.body.csvUrl !== '') {
            runDirectionParser(req.body.csvUrl).then(datas => {
                Promise.all(
                    datas.map(data => Direction.create(data))
                ).then(_ => {
                    res.json({ message: "Direction import finished!" });
                });
            });
        } else {
            res.json({ message: "No url to csv given" });
        }
    } catch(e) {
        e.stack;
    }

});

router.get('/', function(req, res, next) {
    Direction.find(function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.get('/:id', function(req, res, next) {
    Direction.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.post('/', function(req, res, next) {
    Direction.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.put('/:id', function(req, res, next) {
    Direction.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.delete('/:id', function(req, res, next) {
    Direction.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
