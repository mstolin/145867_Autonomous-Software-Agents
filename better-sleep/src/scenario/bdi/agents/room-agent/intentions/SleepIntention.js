const Intention = require("../../../../../lib/bdi/Intention");
const Clock = require("../../../../../lib/utils/Clock");
const { SleepGoal } = require("../Goals");

/**
 * @class SleepIntention
 * 
 * This intention is responsible to turn of the
 * light at a given time, when the residents want
 * to go to sleep.
 */
class SleepIntention extends Intention {

    static applicable(goal) {
        return goal instanceof SleepGoal;
    }

    /**
     * Turns off the main light.
     */
    #turnOffMainLight() {
        try {
            this.agent.room.mainLight.turnOff();
        } catch (err) {
            this.log(err);
        }
    }

    /**
     * Update the agents beliefs.
     */
     #updateAgentBeliefs() {
        this.agent.beliefs.undeclare("on mainLight");
    }

    *exec() {
        let hh = this.goal.parameters["hh"];
        let mm = this.goal.parameters["mm"];
        while (true) {
            yield;
            if (Clock.global.hh == hh && Clock.global.mm == mm) {
                this.#turnOffMainLight();
                this.#updateAgentBeliefs();
                break;
            }
        }
    }

}

module.exports = SleepIntention;