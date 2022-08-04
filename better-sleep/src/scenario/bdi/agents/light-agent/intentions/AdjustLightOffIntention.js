const Intention = require("../../../../../lib/bdi/Intention");
const { AdjustLightOffGoal } = require("../Goals");

class AdjustLightOffIntention extends Intention {
    
    #beliefsToUpdate = [
        "morning-brightness mainLight",
        "afternoon-brightness mainLight",
        "evening-brightness mainLight",
        "morning-temp mainLight",
        "afternoon-temp mainLight",
        "evening-temp mainLight",
    ]

    static applicable(goal) {
        return goal instanceof AdjustLightOffGoal;
    }

    #updateBeliefs() {
        for (const belief of this.#beliefsToUpdate) {
            this.agent.beliefs.undeclare(belief);
        }
    }

    *exec() {
        this.agent.room.mainLight.setTemperature(0);
        this.agent.room.mainLight.setBrightness(0);
        this.#updateBeliefs();
    }
}

module.exports = AdjustLightOffIntention;
