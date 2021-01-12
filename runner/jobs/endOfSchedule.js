require('dotenv').config();
const axios = require('axios');
const SERVER = process.env['SERVER_URL']


axios.post(`${SERVER}/api/script/theend`)
    .then(resp => {
        console.log("Posting ", resp);
        process.exit(0);
    }).catch(e => {
        console.log(e);
        process.exit(1);
    });
