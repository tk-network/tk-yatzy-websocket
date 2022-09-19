module.exports = (wss) => {
    const schedule = require("node-schedule");
    const jobs = require("./jobs");

    schedule.scheduleJob("2 * * * *", () => {
        jobs.forEach(job => {
            job(wss);
        });
    });
}