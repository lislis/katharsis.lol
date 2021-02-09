const express = require('express');
const router = express.Router();
const Setting = require('../models/Settings.js');

router.get('/', (req, res, next) => {
  Setting.find((err, setting) => {
    if (err) return next(err);
    res.json(setting);
  });
});

router.get('/:id', (req, res, next) => {
  Setting.findById(req.params.id, (err, setting) => {
    if (err) return next(err);
    res.json(setting);
  });
});

router.get('/bykey/:key', (req, res, next) => {
    Setting.find({ key: req.params.key }, (err, setting) => {
        if (err) return next(err);
        res.json(setting);
    });
});


router.post('/', (req, res, next) => {
    Setting.create(req.body, (err, setting) => {
        if (err) return next(err);
        res.json(setting);
    });
});

router.put('/:id', (req, res, next) => {
  Setting.findByIdAndUpdate(req.params.id, req.body, (err, setting) => {
    if (err) return next(err);
    res.json(setting);
  });
});

router.delete('/:id', (req, res, next) => {
  Setting.findByIdAndRemove(req.params.id, req.body, (err, setting) => {
    if (err) return next(err);
    res.json(setting);
  });
});

module.exports = router;
