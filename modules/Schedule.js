const schedule = require('node-schedule');

class Schedule {
    constructor() {
        this.dailyMailRule = new schedule.RecurrenceRule();
        this.dailyMailRule.dayOfWeek = [new schedule.Range(0, 6)];
        this.dailyMailRule.hour = 6;
        this.dailyMailRule.minute = 0;
    }
    startDailyMail(func) {
        this.dailyMail = schedule.scheduleJob(this.dailyMailRule, () => {
            func();
        });
    }
}

module.exports = new Schedule();