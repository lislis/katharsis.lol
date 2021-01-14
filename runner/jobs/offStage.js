require('dotenv').config();
const axios = require('axios');

const SERVER = process.env['SERVER_URL']

axios.post(`${SERVER}/api/script/offstage`)
    .then(resp => {
        console.log("Off the stage");
        //process.exit(0);
    }).catch(e => {
        console.log(e);
        //process.exit(1);
    });
