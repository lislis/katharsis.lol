const { parentPort } = require('worker_threads');

//let args = JSON.parse(process.argv[2]);
console.log("Hey log job");

if (parentPort) {
    parentPort.once('message', message => {
        if (message === 'cancel') return cancel();
    });
}

process.exit(0);
