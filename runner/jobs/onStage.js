/*eslint no-process-exit: "off"*/
require('dotenv').config();
const axios = require('axios');
const logger = require('../lib/logger').logger;
const SERVER = process.env['SERVER_URL'];

axios.post(`${SERVER}/api/script/onstage`)
  .then(() => {
        logger.info("[job] To the stage");
        process.exit(0);
    }).catch(e => {
        logger.error(e);
        process.exit(1);
    });
