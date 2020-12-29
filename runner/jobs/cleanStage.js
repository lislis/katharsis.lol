require('dotenv').config();
const axios = require('axios');

const SERVER = process.env['SERVER_URL']

axios.post(`${SERVER}/api/script/cleanStage`)
    .then(resp => {
        console.log("clean stage ", resp);
    }).catch(e => console.log(e))