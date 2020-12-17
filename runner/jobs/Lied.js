require('dotenv').config();
const axios = require('axios');

const SERVER = process.env['SERVER_URL']

axios.post(`${SERVER}/api/script/category`, {
    category: "Lied"
}).then(resp => {
    console.log("Posting an idea");
}).catch(e => {
    console.log(e);
});
