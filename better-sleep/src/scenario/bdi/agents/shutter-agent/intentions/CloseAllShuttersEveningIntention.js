const Intention = require("../../../../../lib/bdi/Intention");
const Clock = require("../../../../../lib/utils/Clock");
const { EveningGoal } = require("../Goals");

/**
 * @class CloseAllShuttersEveningIntention
 *
 * This intention is responsible to close all shutters
 * in the evening at the given hour by the goal.
 */
class CloseAllShuttersEveningIntention extends Intention {
    static applicable(goal) {
        return goal instanceof EveningGoal;
    }

    /**
     * Closes all shutters of the room.
     */
    #closeAllShutters() {
        this.agent.room.shutters.forEach((shutter) => {
            try {
              shutter.close();
            } catch (err) {
              this.log(err);
            }
        });
    }

    /**
     * Update the agents beliefs.
     */
    #updateAgentBeliefs() {
        this.agent.beliefs.undeclare("open shutters");
    }

    *exec() {
        let hh = this.goal.parameters["hh"];
        let mm = this.goal.parameters["mm"];
        while (true) {
            yield;
            if (Clock.global.hh == hh && Clock.global.mm == mm) {
                this.#closeAllShutters();
                this.#updateAgentBeliefs();
                break;
            }
        }
    }
}

module.exports = CloseAllShuttersEveningIntention;
