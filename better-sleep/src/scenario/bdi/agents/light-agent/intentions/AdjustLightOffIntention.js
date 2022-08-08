const Intention = require("../../../../../lib/bdi/Intention");
const { AdjustLightOffGoal } = require("../goals");

/**
 * This intention adjust the temperature and the
 * brightness of the main light to zero. This has
 * the effect, that the light is off.
 *
 * Attention: The light is still powerd on, but
 * does not provide illumination.
 * @class
 */
class AdjustLightOffIntention extends Intention {
    #beliefsToUpdate = [
        "morning-brightness",
        "afternoon-brightness",
        "evening-brightness",
        "morning-temp",
        "afternoon-temp",
        "evening-temp",
    ];

    static applicable(goal) {
        return goal instanceof AdjustLightOffGoal;
    }

    /**
     * Updates the beliefs of the agent.
     *
     * @param {Light} mainLight
     */
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
