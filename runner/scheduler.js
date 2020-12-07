const cron = require('node-cron');

cron.schedule("* * * * * *", () => {

    console.log("Running every minute")

})
