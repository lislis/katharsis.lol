require('dotenv').config();
const axios = require('axios');

const SERVER = process.env['SERVER_URL']

axios.post(`${SERVER}/api/script/category`, {
  category: "Phrase"
}).then(resp => {
  console.log("Posting a phrase");
}).catch(e => {
  console.log(e);
});
