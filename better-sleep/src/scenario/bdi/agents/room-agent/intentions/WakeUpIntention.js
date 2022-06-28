const Intention = require("../../../../../lib/bdi/Intention");
const Clock = require("../../../../../lib/utils/Clock");
const { WakeUpGoal } = require("../Goals");

/**
 * @class WakeUpIntention
 * 
 * This intention is responsible to turn on the light
 * at a given time, when the residents want to wake up.
 */
class WakeUpIntention extends Intention {

    static applicable(goal) {
        return goal instanceof WakeUpGoal;
    }

    /**
     * Turns on the main light.
     */
    #turnOnMainLight() {
        try {
            this.agent.room.mainLight.turnOn();
        } catch (err) {
            this.log(err);
        }
    }

    /**
     * Update the agents beliefs.
     */
     #updateAgentBeliefs() {
        this.agent.beliefs.declare("on mainLight");
    }

    *exec() {
        let hh = this.goal.parameters["hh"];
        let mm = this.goal.parameters["mm"];
        while (true) {
            yield;
            if (Clock.global.hh == hh && Clock.global.mm == mm) {
                this.#turnOnMainLight();
                this.#updateAgentBeliefs();
                break;
            }
        }
    }

}

module.exports = WakeUpIntention;
