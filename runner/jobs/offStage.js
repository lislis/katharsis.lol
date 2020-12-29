require('dotenv').config();
const axios = require('axios');

const SERVER = process.env['SERVER_URL']

axios.post(`${SERVER}/api/script/offstage`)
    .then(resp => {
        console.log("Off the stage", resp);
    }).catch(e => console.log(e))
