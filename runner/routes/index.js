//require('dotenv').config();
const express = require('express');
const router = express.Router();
//var mongoose = require('mongoose');
const axios = require('axios');
const { run } = require('../scheduler.js')

router.post('/runschedule', function(req, res, next) {
    if (req.body.hasOwnProperty('csvUrl') && req.body.csvUrl !== '') {
        run(req.body.csvUrl).then(r => {
            console.log(r);
            res.json({ message: "worked!" });
        });

    } else {
        res.json({ message: "No url to csv given" });
    }
});

module.exports = router;
