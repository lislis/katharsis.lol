/*eslint no-process-exit: "off"*/
require('dotenv').config();
const axios = require('axios');
const { parentPort } = require('worker_threads');
const logger = require('../lib/logger').logger;

const SERVER = process.env['SERVER_URL'];

/*
axios.post(`${SERVER}/api/script/theend`).then(() => {
  logger.info("[job] The end!");
  if (parentPort) parentPort.postMessage('done');
  else process.exit(0);
}).catch(e => {
  console.log(e);
  process.exit(1);
});
*/

axios.post(`${SERVER}/api/script/bulkOffStage`).then(() => {
    logger.info("[job] everyone off!");
    if (parentPort) parentPort.postMessage('done');
    else process.exit(0);
}).catch(e => {
    console.log(e);
    process.exit(1);
});
