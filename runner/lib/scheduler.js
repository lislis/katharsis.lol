const axios = require('axios');
const neatCsv = require('neat-csv');

const { startBreeScheduler, createJobListFromCSV } = require('./scheduleHelper.js');

async function run(url, path) {
  let csvData = await axios.get(url);
  let parsedData = await neatCsv(csvData.data);

  let jobList = createJobListFromCSV(parsedData, __dirname);

  startBreeScheduler(jobList);
}

module.exports = { run };
