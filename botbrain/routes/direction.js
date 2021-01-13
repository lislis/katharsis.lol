const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { runDirectionParser } = require('../lib/csvparser.js');
const utils = require('../lib/utils.js');

const Direction = require('../models/Direction.js');
const Word = require('../models/Word.js');
//const User = require('../models/User.js');

router.get('/bytype/:type', (req, res, next) => {
  Promise.all([
    Word.find().exec(),
    //User.find({ hasPermission: true }).exec()
  ]).then(values => {
    Direction
      .aggregate([
        { $match: { direction_type: req.params.type }},
        { $sample: {size: 1}}
      ]).exec((err, direction) => {
        if (err) return next(err);
        let newDirections = utils.fillPlaceholders(direction, values, req.query);
        //req.log.info(newDirections.text)
        res.json(newDirections);
      });
  }).catch(e => req.log.error(e));
});

router.get('/any', (req, res, next) => {
  Promise.all([
    Word.find().exec(),
    User.find({ hasPermission: true }).exec()
  ]).then(values => {
    Direction
      .aggregate([{ $sample: {size: 1}}])
      .exec((err, direction) => {
        if (err) return next(err);
        let newDirections = utils.fillPlaceholders(direction, values, req.query);
        res.json(newDirections);
      });
  }).catch(e => req.log.error(e));
});

router.post('/bulkimport', (req, res, next) => {
  if (req.body.hasOwnProperty('csvUrl') && req.body.csvUrl !== '') {
    runDirectionParser(req.body.csvUrl).then(datas => {
      Promise.all(
        datas.map(data => Direction.create(data))
      ).then(_ => {
        res.json({ message: "Direction import finished!" });
      });
    });
  } else {
    req.log.error("[/bulkimport] no url given");
    res.json({ message: "No url to csv given" });
  }
});

router.get('/', (req, res, next) => {
  Direction.find((err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/:id', (req, res, next) => {
  Direction.findById(req.params.id, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/', (req, res, next) => {
  Direction.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', (req, res, next) => {
  Direction.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', (req, res, next) => {
  Direction.findByIdAndRemove(req.params.id, req.body, (err, post) =>{
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
