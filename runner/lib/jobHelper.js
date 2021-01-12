const path = require('path');
const ms = require('ms');
const dayjs = require('dayjs');
const Bree = require('bree');
const Graceful = require('@ladjs/graceful');
const fs = require('fs');


function createJobListFromCSV(data, path) {
    let timeCounter = 0;

    let jobList = data.map((v, k) => {
        return createJobFromRow(v, k, path, timeCounter);
    });
    jobList.push(createJobFromRow({direction: 'theEnd', time: 10}, data.length, path, timeCounter));

    //
    jobList.map(x => console.log(x.timeout))

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
              category: row['direction'].trim(),
              numerus: row['numerus'].trim()
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
    jobs: jobList
  });

  const graceful = new Graceful({ brees: [bree] });
  graceful.listen();

  bree.start();
}

module.exports = { createJobListFromCSV, startBreeScheduler };
