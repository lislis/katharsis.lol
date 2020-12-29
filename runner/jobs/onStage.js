require('dotenv').config();
const axios = require('axios');

const SERVER = process.env['SERVER_URL']

axios.post(`${SERVER}/api/script/onstage`)
    .then(resp => {
        console.log("To the stage", resp);
    }).catch(e => console.log(e))
