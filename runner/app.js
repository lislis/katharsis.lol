const path = require('path');
const ms = require('ms');
const dayjs = require('dayjs');
const Bree = require('bree');
const Graceful = require('@ladjs/graceful');
const csv = require('csv-parser');
const fs = require('fs');

let jobObj = [];
let counter = 0;

fs.createReadStream('data/schedule.csv')
  .pipe(csv({delimiter: ',',
               quote: '"',
               columns: true}))
  .on('data', (row) => {
    let job = {}
    job.name = `job-no-${counter}`;
    job.path = path.join(__dirname, 'jobs', `${row['Direction']}.js`)

    if (row['timeout'] === 'true') {
      job.timeout = row['Zeit'];
    }
    if (row['interval'] === 'true') {
      job.interval = row['Zeit'];
    }

    jobObj.push(job);
    counter ++;
  })
  .on('end', () => {
    console.log('CSV file successfully processed');

    const bree = new Bree({
      jobs: jobObj
    });

    const graceful = new Graceful({ brees: [bree] });
    graceful.listen();

    bree.start();
  });
