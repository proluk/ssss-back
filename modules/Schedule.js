const schedule = require('node-schedule');

class Schedule {
    constructor() {
        this.dailyMailRule = new schedule.RecurrenceRule();
        this.dailyMailRule.dayOfWeek = [new schedule.Range(0, 6)];
        this.dailyMailRule.hour = 6;
        this.dailyMailRule.minute = 0;
        this.serviceTestRule = new schedule.RecurrenceRule();
        this.serviceTestRule.minute = new schedule.Range(0, 59, 1);
    }
    startDailyMail(func) {
        this.dailyMail = schedule.scheduleJob(this.dailyMailRule, () => {
            func();
        });
    }
    startServiceTest(callback){
        this.serviceTest = schedule.scheduleJob(this.serviceTestRule, () => {
            callback();
        });
    }
}

module.exports = new Schedule();