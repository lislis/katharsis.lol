var axios = require('axios');

var server_endpoint = 'http://localhost:3000/api/room';

axios
    .post(server_endpoint, {
        room_name: "Stage",
        main: true,
        private: false,
        locked: true
    }).then(resp => { console.log("Done"); })
    .catch(err => console.log(err));

axios
    .post(server_endpoint, {
        room_name: "Writers Room",
        main: true,
        private: false,
        locked: false
    }).then(resp => { console.log("Done"); })
    .catch(err => console.log(err));
