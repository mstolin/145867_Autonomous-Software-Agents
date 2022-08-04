const Goal = require("../../../../lib/bdi/Goal");

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

class AdjustLightOffGoal extends Goal {}
class TurnLightOnGoal extends Goal {}
class TurnLightOffGoal extends Goal {}

module.exports = {
    AdjustLightOffGoal,
    TurnLightOnGoal,
    TurnLightOffGoal,
};
