var axios = require('axios');

var server_endpoint = 'http://localhost:3000/api/direction';

axios.post(server_endpoint, {
    room_name: "Writers Room",
    main: true,
    private: false,
    locked: false
}).then(resp => { console.log("Done"); });

axios.post(server_endpoint, {
    room_name: "Bühne",
    main: true,
    private: false,
    locked: true
}).then(resp => { console.log("Done"); });
