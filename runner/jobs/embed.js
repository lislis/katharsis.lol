/*eslint no-process-exit: "off"*/
require('dotenv').config();
const axios = require('axios');
const { parentPort } = require('worker_threads');
const logger = require('../lib/logger').logger;

const SERVER = process.env['SERVER_URL'];

if (process.argv.length > 2) {
    const args = JSON.parse(process.argv[2]);
    let postObj = {};

    logger.info(`[job] ${args.platform} ${args.id}`);

    if (args.platform) {
        postObj.platform = args.platform;
    } else {
        logger.error("No platform given, exiting");
        process.exit(1);
    }
    if (args.id) {
        postObj.id = args.id;
    } else {
        logger.error("No id given, exiting");
        process.exit(1);
    }

    axios.post(`${SERVER}/api/script/embed`, postObj)
        .then(() => {
            logger.info(`[job] ${postObj.platform} ${postObj.id}`);

            if (parentPort) parentPort.postMessage('done');
            else process.exit(0);
        }).catch(e => {
            logger.error(e);
            process.exit(1);
        });

} else {
    logger.error("Not enough args given, exiting");
    process.exit(1);
}
