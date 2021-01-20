require('dotenv').config();
const axios = require('axios');
const { parentPort } = require('worker_threads');
const logger = require('../lib/logger').logger;

const SERVER = process.env['SERVER_URL'];

axios.post(`${SERVER}/api/script/cleanStage`).then(resp => {
  logger.info("[job] Clean stage!");
  if (parentPort) parentPort.postMessage('done');
  else process.exit(0);
}).catch(e => {
  logger.error(e);
  process.exit(1);
});
