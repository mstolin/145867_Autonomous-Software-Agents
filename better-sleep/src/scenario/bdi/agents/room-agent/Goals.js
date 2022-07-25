const Goal = require("../../../../lib/bdi/Goal");

class AdjustLightOffGoal extends Goal {}
class TurnLightOnGoal extends Goal {}
class TurnLightOffGoal extends Goal {}

module.exports = {
    AdjustLightOffGoal,
    TurnLightOnGoal,
    TurnLightOffGoal,
};
