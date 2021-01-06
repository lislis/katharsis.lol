const axios = require('axios');
const neatCsv = require('neat-csv');

const { startBreeScheduler, createJobFromRow } = require('./lib/jobHelper.js');

async function run(url) {
  let csvData = await axios.get(url);
  let parsedData = await neatCsv(csvData.data);

  let jobList = parsedData.map((v, k) => {
    return createJobFromRow(v, k, __dirname);
  });

  jobList.push(createJobFromRow({direction: 'theEnd', time: 10}, parsedData.length, __dirname));

  startBreeScheduler(jobList);
}

module.exports = { run };
