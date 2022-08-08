const Goal = require("../../../../lib/bdi/Goal");

/**
 * Parent class for all light related goals.
 * @class
 */
class LightGoal extends Goal {

    #mainLight;

    constructor(mainLight) {
        super({});
        this.#mainLight = mainLight;
    }

    get mainLight() {
        return this.#mainLight;
    }

}

/**
 * This goal will trigger to adjust the 
 * light illuminence to 0.
 * @class
 */
class AdjustLightOffGoal extends Goal {}
/**
 * This goal will trigger to power the
 * light on.
 * @class
 */
class TurnLightOnGoal extends Goal {}
/**
 * This goal will trigger to power the
 * light off.
 * @class
 */
class TurnLightOffGoal extends Goal {}

module.exports = {
    AdjustLightOffGoal,
    TurnLightOnGoal,
    TurnLightOffGoal,
};
