require('dotenv').config();
const axios = require('axios');
const { parentPort } = require('worker_threads');
const logger = require('../lib/logger').logger;

const SERVER = process.env['SERVER_URL'];

axios.post(`${SERVER}/api/script/theend`).then(resp => {
  logger.info("[job] The end!");
  if (parentPort) parentPort.postMessage('done');
  else process.exit(0);
}).catch(e => {
  console.log(e);
  process.exit(1);
});
