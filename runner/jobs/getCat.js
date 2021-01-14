require('dotenv').config();
const axios = require('axios');
const SERVER = process.env['SERVER_URL']

if (process.argv.length > 2) {
    const args = JSON.parse(process.argv[2]);
    let postObj = {};

    if (args.category) {
        postObj.category = args.category;
    }
    if (args.numerus) {
        postObj.numerus = args.numerus;
    }

    axios.post(`${SERVER}/api/script/category`, postObj)
        .then(resp => {
            console.log("Posting ");
        }).catch(e => {
            console.log(e);
            //process.exit(1);
        });
    process.exit(0);
} else {
    console.log("no arg given, not doing anything");
    process.exit(1);
}
