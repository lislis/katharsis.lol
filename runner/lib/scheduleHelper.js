const path = require('path');
const ms = require('ms');
const dayjs = require('dayjs');
const Bree = require('bree');
const Graceful = require('@ladjs/graceful');
const fs = require('fs');
const logger = require('./logger').logger;

function createJobListFromCSV(data, path) {
  let timeCounter = 0;
  let cutPath = [...path.split('/').slice(0,-1)].join("/");

  let jobList = data.map((v, k) => {
    timeCounter = timeCounter + parseInt(v['time'], 10);
    return createJobFromRow(v, k, cutPath, timeCounter);
  });
  timeCounter = timeCounter + 60;
  jobList.push(createJobFromRow({direction: 'theEnd'}, data.length, cutPath, timeCounter));

  return jobList;
}

function createJobFromRow(row, jobNumber, otherPath, timeCounter) {
  let job = {};
  job.name = `job-no-${jobNumber}`;

  switch(row['direction']) {
    case 'onstage':
      job.path = path.join(otherPath, 'jobs', `onStage.js`);
      break;
    case 'offstage':
      job.path = path.join(otherPath, 'jobs', `offStage.js`);
      break;
    case 'cleanStage':
      job.path = path.join(otherPath, 'jobs', `cleanStage.js`);
      break;
    case 'cleanEverything':
      job.path = path.join(otherPath, 'jobs', `cleanEverything.js`);
      break;
    case 'theEnd':
      job.path = path.join(otherPath, 'jobs', `endOfSchedule.js`);
      break;
    case 'exportPlay':
      job.path = path.join(otherPath, 'jobs', `exportPlay.js`);
      break;
    case 'log':
      job.path = path.join(otherPath, 'jobs', `log.js`);
      break;
    default:
      job.worker = {
        argv: [JSON.stringify({
          category: row['direction'],
          numerus: row['numerus']
        })]
      };
      job.path = path.join(otherPath, 'jobs', `getCat.js`);
  }

  job.timeout = timeCounter + 's';
  logger.info(`${job.name} after ${job.timeout} (${job.path})`);

  return job;
}

function startBreeScheduler(jobList) {
  const bree = new Bree({
    closeWorkerAfterMs: ms('5s'),
    jobs: jobList,
    errorHandler: (error, workerMetadata) => {
      if (workerMetadata.threadId) {
        logger.info(`[bree] There was an error while running a worker ${workerMetadata.name} with thread ID: ${workerMetadata.threadId}`);
      } else {
        logger.info(`[bree] There was an error while running a worker ${workerMetadata.name}`)
      }
      logger.error(error);
      errorService.captureException(error);
    }
  });

  bree.on('worker created', (name) => {
    logger.info(`[bree] worker created ${name}`);
  });

  bree.on('worker deleted', (name) => {
    logger.info(`[bree] worker deleted ${name}`);
  });


  const graceful = new Graceful({ brees: [bree] });
  graceful.listen();

  bree.start();
}

module.exports = { createJobListFromCSV, startBreeScheduler };
