const path = require('path');
const ms = require('ms');
const dayjs = require('dayjs');
const Bree = require('bree');
const Graceful = require('@ladjs/graceful');
const fs = require('fs');

let timeCounter = 0;

function createJobFromRow(row, jobNumber, otherPath) {
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
        argv: [JSON.stringify({ category: row['direction'] })]
      };
      job.path = path.join(otherPath, 'jobs', `getCat.js`);
  }

  timeCounter = timeCounter + parseInt(row['time'], 10);
  job.timeout = timeCounter + 's';

  return job;
}

function startBreeScheduler(jobList) {
  const bree = new Bree({
    jobs: jobList
  });

  const graceful = new Graceful({ brees: [bree] });
  graceful.listen();

  bree.start();
}

module.exports = { createJobFromRow, startBreeScheduler };
