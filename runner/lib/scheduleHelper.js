const path = require('path');
const ms = require('ms');
const dayjs = require('dayjs');
const Bree = require('bree');
const Graceful = require('@ladjs/graceful');
const fs = require('fs');

function createJobListFromCSV(data, path) {
  let timeCounter = 0;
  let cutPath = [...path.split('/').slice(0,-1)].join("/");

  let jobList = data.map((v, k) => {
    return createJobFromRow(v, k, cutPath, timeCounter);
  });
  jobList.push(createJobFromRow({direction: 'theEnd', time: 60}, data.length, cutPath, timeCounter));
  jobList.map(x => console.log(x.timeout));

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

  timeCounter = timeCounter + parseInt(row['time'], 10);
  job.timeout = timeCounter + 's';

  return job;
}

function startBreeScheduler(jobList) {
  const bree = new Bree({
    jobs: jobList,
    errorHandler: (error, workerMetadata) => {
      if (workerMetadata.threadId) {
        //logger.info(`There was an error while running a worker ${workerMetadata.name} with thread ID: ${workerMetadata.threadId}`)
        console.log(`[bree] There was an error while running a worker ${workerMetadata.name} with thread ID: ${workerMetadata.threadId}`);
      } else {
        //logger.info(`There was an error while running a worker ${workerMetadata.name}`)
        console.log(`[bree] There was an error while running a worker ${workerMetadata.name}`);
      }

      //logger.error(error);
      errorService.captureException(error);
    }
  });

  bree.on('worker created', (name) => {
    //console.log('[bree] worker created', name);
    //console.log(bree.workers[name]);
  });

  bree.on('worker deleted', (name) => {
    //console.log('[bree] worker deleted', name);
    //console.log(typeof bree.workers[name] === 'undefined');
  });


  const graceful = new Graceful({ brees: [bree] });
  graceful.listen();

  bree.start();
}

module.exports = { createJobListFromCSV, startBreeScheduler };
