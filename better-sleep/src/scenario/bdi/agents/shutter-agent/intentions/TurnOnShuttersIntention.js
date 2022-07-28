const Intention = require("../../../../../lib/bdi/Intention");
const Clock = require("../../../../../lib/utils/Clock");
const { TurnOnShuttersGoal } = require("../Goals");

/**
 * @class TurnOnShuttersIntention
 *
 * This intention is responsible to turn on all shutters
 * in the morning at the given hour by the goal.
 */
class TurnOnShuttersIntention extends Intention {
    static applicable(goal) {
        return goal instanceof TurnOnShuttersGoal;
    }
    /**
     * Turns all shutters on.
     */
    /*#turnOnShutters() {
        this.agent.room.shutters.forEach((shutter) => {
            try {
              shutter.turnOn();
              this.agent.beliefs.declare("on shutters");
            } catch (err) {
              this.log(err);
            }
        });
    }

    *exec() {
        let hh = this.goal.parameters["hh"];
        let mm = this.goal.parameters["mm"];
        while (true) {
            yield;
            if (Clock.global.hh == hh && Clock.global.mm == mm) {
                this.#turnOnShutters();
                break;
            }
        }
    }*/
    *exec() {
        this.agent.room.shutters.forEach((shutter) => {
            try {
                shutter.turnOn();
                this.agent.beliefs.declare("on shutters");
            } catch (err) {
                this.log(err);
            }
        });
    }
}

module.exports = TurnOnShuttersIntention;
