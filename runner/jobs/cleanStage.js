require('dotenv').config();
const axios = require('axios');

const SERVER = process.env['SERVER_URL']

axios.post(`${SERVER}/api/script/cleanStage`)
    .then(resp => {
        console.log("rm all messages", resp);
    }).catch(e => console.log(e))
