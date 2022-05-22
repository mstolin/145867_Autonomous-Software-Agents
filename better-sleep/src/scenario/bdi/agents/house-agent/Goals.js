const Goal = require("../../../../lib/bdi/Goal");

class MorningGoal extends Goal {}

class EveningGoal extends Goal {}

class SenseMovementGoal extends Goal {}

class SenseDaytimeGoal extends Goal {}

module.exports = {
    MorningGoal,
    EveningGoal,
    SenseMovementGoal,
    SenseDaytimeGoal,
};
