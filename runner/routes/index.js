const express = require('express');
const router = express.Router();
const axios = require('axios');
const { run } = require('../lib/scheduler');
const logger = require('../lib/logger').logger;

router.post('/runschedule', function(req, res, next) {
    if (req.body.hasOwnProperty('csvUrl') && req.body.csvUrl !== '') {
        run(req.body.csvUrl)
            .then(r => {
                logger.info("[/runschedule] Schedule stated");
                return res.json({ message: "Schedule started" });
            })
            .catch(e => logger.error(e));
    } else {
        return next("No url given");
    }
});

module.exports = router;
