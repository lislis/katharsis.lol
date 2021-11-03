const express = require('express');
const router = express.Router();
const Character = require('../models/Character.js');
const User = require('../models/User.js');

router.get('/', (req, res, next) => {
  Character.find((err, characters) => {
    if (err) return next(err);
    res.json(characters);
  });
});

router.get('/:id', (req, res, next) => {
  Character.findById(req.params.id, (err, character) => {
    if (err) return next(err);
    res.json(character);
  });
});

router.post('/', (req, res, next) => {
  Character.create(req.body, (err, character) => {
    if (err) return next(err);

    // technically, we should throw an error here, because a character without user is not usable
    if (req.body.userId) {
      User.findByIdAndUpdate(req.body.userId, { "characterId": character._id }).exec();
    }

    req.app.io.emit('new-character', { message: character });
    res.json(character);
  });
});

router.put('/:id', (req, res, next) => {
  Character.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', (req, res, next) => {
  Character.findByIdAndRemove(req.params.id, req.body, (err, character) => {
    if (err) return next(err);
    req.app.io.emit('delete-character', { message: character });
    res.json(character);
  });
});

module.exports = router;
