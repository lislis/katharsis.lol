const express = require('express');
const router = express.Router();
const Setting = require('../models/Settings.js');
const { processCharacterSheet2Object,
        processCharacterProfile2Object } = require('../lib/charactersheet.js');

router.post('/charactersheet', async (req, res, next) => {
  if (!req.body.csvUrl || req.body.csvUrl == '') return next({ message: 'no url given'});
  let url = req.body.csvUrl;

  try {
    let val = await processCharacterSheet2Object(url);
    let s = { key: 'characterSheet', value: JSON.stringify(val) };

    Setting.create(s, (err, setting) => {
      if (err) return next(err);
      return res.json(setting);
    });

  } catch(e) {
    return next(e);
  }
});

router.post('/characterprofile', async (req, res, next) => {
  if (!req.body.csvUrl || req.body.csvUrl == '') return next({ message: 'no url given'});
  let url = req.body.csvUrl;

  try {
    let val = await processCharacterProfile2Object(url);
    let s = { key: 'characterProfile', value: JSON.stringify(val) };

    Setting.create(s, (err, setting) => {
      if (err) return next(err);
      return res.json(setting);
    });

  } catch(e) {
    return next(e);
  }
});



router.get('/', (req, res, next) => {
  Setting.find((err, setting) => {
    if (err) return next(err);
    return res.json(setting);
  });
});

router.get('/:id', (req, res, next) => {
  Setting.findById(req.params.id, (err, setting) => {
    if (err) return next(err);
    return res.json(setting);
  });
});

router.get('/bykey/:key', (req, res, next) => {
  Setting.find({ key: req.params.key }, (err, setting) => {
    if (err) return next(err);
    return res.json(setting);
  });
});


router.post('/', (req, res, next) => {
  Setting.create(req.body, (err, setting) => {
    if (err) return next(err);
    return res.json(setting);
  });
});

router.put('/:id', (req, res, next) => {
  Setting.findByIdAndUpdate(req.params.id, req.body, (err, setting) => {
    if (err) return next(err);
    return res.json(setting);
  });
});

router.delete('/:id', (req, res, next) => {
  Setting.findByIdAndRemove(req.params.id, req.body, (err, setting) => {
    if (err) return next(err);
    return res.json(setting);
  });
});

module.exports = router;
