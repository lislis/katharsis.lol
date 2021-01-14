const express = require('express');
const router = express.Router();
const axios = require('axios');
const { run } = require('../lib/scheduler.js')

router.post('/runschedule', function(req, res, next) {
    if (req.body.hasOwnProperty('csvUrl') && req.body.csvUrl !== '') {
        run(req.body.csvUrl)
            .then(r => {
                console.log("Schedule stated");
                return res.json({ message: "Schedule started" });
            })
            .catch(e => console.log(e));
    } else {
        return next("No url given");
    }
});

module.exports = router;
