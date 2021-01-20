/*eslint no-process-exit: "off"*/
const { parentPort } = require('worker_threads');
const logger = require('../lib/logger').logger;

logger.info("Hey log job");

if (parentPort) parentPort.postMessage('done');
else process.exit(0);
