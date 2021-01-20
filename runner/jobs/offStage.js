/*eslint no-process-exit: "off"*/
require('dotenv').config();
const axios = require('axios');
const logger = require('../lib/logger').logger;
const SERVER = process.env['SERVER_URL'];

axios.post(`${SERVER}/api/script/offstage`)
  .then(() => {
        logger.info("[job] Off the stage");
        process.exit(0);
    }).catch(e => {
        logger.error(e);
        process.exit(1);
    });
