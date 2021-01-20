const express = require('express');
const router = express.Router();
const { runWordParser } = require('../lib/csvparser.js');
const Word = require('../models/Word.js');

router.get('/bytype/:type', (req, res, next) => {
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

router.post('/bulkimport', (req, res) => {
  if ((Object.prototype.hasOwnProperty.call(req.body, 'csvUrl')) && req.body.csvUrl !== '') {
    runWordParser(req.body.csvUrl).then(datas => {
      Promise.all(
        datas.map(data => Word.create(data))
      ).then(() => {
        res.json({ message: "Word import finished!" });
      }).catch(e => req.log.error(e));
    });
  } else {
    res.json({ message: "No url to csv given" });
  }
});

router.post('/bulkdelete', (req, res, next) => {
  Word.deleteMany((err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/', (req, res, next) => {
  Word.find((err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/:id', (req, res, next) => {
  Word.findById(req.params.id, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/', (req, res, next) => {
  Word.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', (req, res, next) => {
  Word.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', (req, res, next) => {
  Word.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
