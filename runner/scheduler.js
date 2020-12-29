const axios = require('axios');
const neatCsv = require('neat-csv');

const { startBreeScheduler, createJobFromRow } = require('./lib/jobHelper.js')

async function run() {
  let csvData = await axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vSJLj4s9scfhPMHuj_kO6ZI6qjZNxZ-lgPS2EEcQIv6cZy3WTfsIqRT_Fdd4paTXdS0AtfCJtxEoaKC/pub?gid=0&single=true&output=csv');
  let parsedData = await neatCsv(csvData.data);

  let jobList = parsedData.map((v, k) => {
    return createJobFromRow(v, k, __dirname);
  })

  startBreeScheduler(jobList);
}

run();
