require('dotenv').config();
const axios = require('axios');

const SERVER = process.env['SERVER_URL']

axios.post(`${SERVER}/api/script/category`, {
    category: "Beziehung"
}).then(resp => {
    console.log("Posting Beziehung");
}).catch(e => {
    console.log(e);
});
