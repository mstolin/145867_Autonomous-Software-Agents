const Intention = require("../../../../../lib/bdi/Intention");
const { AdjustLightOffGoal } = require("../Goals");

class AdjustLightOffIntention extends Intention {
    
    #beliefsToUpdate = [
        "morning-brightness mainLight",
        "afternoon-brightness mainLight",
        "avening-brightness mainLight",
        "morning-temp mainLight",
        "afternoon-temp mainLight",
        "avening-temp mainLight",
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
        try {
            this.agent.room.mainLight.setTemperature(0);
            this.agent.room.mainLight.setBrightness(0);
            this.#updateBeliefs();
        } catch (err) {
            this.log(err);
        }
    }
}

module.exports = AdjustLightOffIntention;
