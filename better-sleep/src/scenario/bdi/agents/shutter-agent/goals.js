const Goal = require("../../../../lib/bdi/Goal");

/**
 * This goal triggers to power on
 * the shutters of a room.
 * @class
 */
class TurnOnShuttersGoal extends Goal {}
/**
 * This goal triggers to power off
 * the shutters of a room.
 * @class
 */
class TurnOffShuttersGoal extends Goal {}

module.exports = {
    TurnOnShuttersGoal,
    TurnOffShuttersGoal,
};
