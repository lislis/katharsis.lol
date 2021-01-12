const express = require('express');
const router = express.Router();
const axios = require('axios');
const { run } = require('../lib/scheduler.js')

router.post('/runschedule', function(req, res, next) {
    if (req.body.hasOwnProperty('csvUrl') && req.body.csvUrl !== '') {
        run(req.body.csvUrl).then(r => {
            console.log("Schedule stated");
        });
        res.json({ message: "Schedule started" });
    } else {
        res.json({ message: "No url to csv given" });
    }
});

module.exports = router;
