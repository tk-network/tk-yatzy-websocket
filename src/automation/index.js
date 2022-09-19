const schedule = require("node-schedule");
const jobs = require("./jobs");

schedule.scheduleJob("1 * * * *", () => {
    jobs.forEach(job => {
        job();
    });
});