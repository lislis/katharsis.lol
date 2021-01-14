require('dotenv').config();
const axios = require('axios');

const SERVER = process.env['SERVER_URL']

axios.post(`${SERVER}/api/script/onstage`)
    .then(resp => {
        console.log("To the stage");
        //process.exit(0);
    }).catch(e => {
        console.log(e);
        //process.exit(1);
    });
