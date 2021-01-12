require('dotenv').config();
const axios = require('axios');

const SERVER = process.env['SERVER_URL']

axios.post(`${SERVER}/api/script/cleanStage`)
    .then(resp => {
        console.log("clean stage ", resp);
        process.exit(0);
    }).catch(e => {
        console.log(e);
        process.exit(1);
    });
