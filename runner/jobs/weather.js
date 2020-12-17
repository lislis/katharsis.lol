require('dotenv').config();
const axios = require('axios');

const SERVER = process.env['SERVER_URL']

axios.post(`${SERVER}/api/script/category`, {
    category: "weather"
}).then(resp => {
    console.log("Posting weather");
}).catch(e => {
    console.log(e);
});
