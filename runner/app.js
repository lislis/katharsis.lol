const path = require('path');

const Bree = require('bree');
const Graceful = require('@ladjs/graceful');

//const script = require('./data/script.js').data;

const bree = new Bree({
    jobs: [{
        name: "log",
        interval: "1m"
    }]
});


//console.log(`A play for ${script.maxPeopleOnStage}, taking ${script.maxTime}`);


// handle graceful reloads, pm2 support, and events like SIGHUP, SIGINT, etc.
const graceful = new Graceful({ brees: [bree] });
graceful.listen();

bree.start();
