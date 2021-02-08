const express = require('express');
const router = express.Router()
const TicketCode = require('../models/TicketCode.js');
const { genCodesArray } = require('../lib/ticketcodehelper.js');

router.post('/bulkcreate', (req, res, next) => {
    req.log.info(req.body.num);
    const docs = genCodesArray(req.body.num);
    TicketCode.insertMany(docs, (err, codes) => {
        if (err) return next(err);
        res.json(codes);
    });
});

router.get('/', (req, res, next) => {
    TicketCode.find((err, codes) => {
        if (err) return next(err);
        res.json(codes);
    });
});

router.get('/:id', (req, res, next) => {
    TicketCode.findById(req.params.id, (err, code) => {
        if (err) return next(err);
        res.json(code);
    });
});

router.post('/', (req, res, next) => {
    TicketCode.create(req.body, (err, code) => {
        if (err) return next(err);
        res.json(code);
    });
});

router.put('/:id', (req, res, next) => {
    TicketCode.findByIdAndUpdate(req.params.id, req.body, (err, code) => {
        if (err) return next(err);
        res.json(code);
    });
});

router.delete('/:id', (req, res, next) => {
    TicketCode.findByIdAndRemove(req.params.id, req.body, (err, code) => {
        if (err) return next(err);
        res.json(code);
    });
});

module.exports = router;
