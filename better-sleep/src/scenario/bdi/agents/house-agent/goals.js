const Goal = require("../../../../lib/bdi/Goal");

class SenseMovementGoal extends Goal {}
/**
 * This goal triggers the SenseDaytimeIntention.
 * @class
 */
class SenseDaytimeGoal extends Goal {}
/**
 * This goal triggers the SenseIlluminanceIntention.
 * @class
 */
class SenseIlluminanceGoal extends Goal {}

module.exports = {
    SenseMovementGoal,
    SenseDaytimeGoal,
    SenseIlluminanceGoal,
};
