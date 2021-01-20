require('dotenv').config();
const axios = require('axios');
const logger = require('../lib/logger').logger;

const SERVER = process.env['SERVER_URL'];

axios.post(`${SERVER}/api/script/exportPlay`).then(resp => {
  logger.info("[job] Export play");
  process.exit(0);
}).catch(e => {
  logger.error(e);
  process.exit(1);
});
