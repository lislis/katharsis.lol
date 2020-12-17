require('dotenv').config();
const axios = require('axios');

const SERVER = process.env['SERVER_URL']

axios.post(`${SERVER}/api/script/category`, {
    category: "aim"
}).then(resp => {
    console.log("Posting an aim");
}).catch(e => {
    console.log(e);
});
