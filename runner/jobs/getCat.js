/*eslint no-process-exit: "off"*/
require('dotenv').config();
const axios = require('axios');
const { parentPort } = require('worker_threads');
const logger = require('../lib/logger').logger;

const SERVER = process.env['SERVER_URL'];

if (process.argv.length > 2) {
  const args = JSON.parse(process.argv[2]);
  let postObj = {};

  if (args.category) {
    postObj.category = args.category;
  }
  if (args.numerus) {
    postObj.numerus = args.numerus;
  }

  axios.post(`${SERVER}/api/script/category`, postObj)
       .then(() => {
         logger.info(`[job] ${postObj.category} ${postObj.numerus}`);

         if (parentPort) parentPort.postMessage('done');
         else process.exit(0);
       }).catch(e => {
         logger.error(e);
         process.exit(1);
       });

} else {
  logger.error("no arg given, not doing anything");
  process.exit(1);
}
