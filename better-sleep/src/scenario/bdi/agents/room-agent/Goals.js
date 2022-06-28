const Goal = require("../../../../lib/bdi/Goal");

class WakeUpGoal extends Goal {}

class SleepGoal extends Goal {}

module.exports = {
    WakeUpGoal,
    SleepGoal
};