require('dotenv').config();
const axios = require('axios');
const { parentPort } = require('worker_threads');

const SERVER = process.env['SERVER_URL']

axios.post(`${SERVER}/api/script/cleanEverything`)
    .then(resp => {
        console.log("clean everything");
        if (parentPort) parentPort.postMessage('done');
        else process.exit(0);
    }).catch(e => {
        console.log(e);
        process.exit(1);
    });
