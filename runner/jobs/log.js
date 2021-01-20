const { parentPort } = require('worker_threads');
const logger = require('./logger').logger;

logger.info("Hey log job");

if (parentPort) parentPort.postMessage('done');
else process.exit(0);
