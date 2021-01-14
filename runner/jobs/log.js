const { parentPort } = require('worker_threads');

console.log("Hey log job");

if (parentPort) parentPort.postMessage('done');
else process.exit(0);
