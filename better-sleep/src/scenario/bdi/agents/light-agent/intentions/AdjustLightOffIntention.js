const Intention = require("../../../../../lib/bdi/Intention");
const { AdjustLightOffGoal } = require("../goals");

class AdjustLightOffIntention extends Intention {
    
    #beliefsToUpdate = [
        "morning-brightness",
        "afternoon-brightness",
        "evening-brightness",
        "morning-temp",
        "afternoon-temp",
        "evening-temp",
    ]

    static applicable(goal) {
        return goal instanceof AdjustLightOffGoal;
    }

    #updateBeliefs(mainLight) {
        for (const belief of this.#beliefsToUpdate) {
            this.agent.beliefs.undeclare(`${belief} ${mainLight}`);
        }
    }

    *exec(params) {
        let mainLight = params.mainLight;
        mainLight.setTemperature(0);
        mainLight.setBrightness(0);
        this.#updateBeliefs(mainLight.name);
    }
}

module.exports = AdjustLightOffIntention;
