const Intention = require("../../../../../lib/bdi/Intention");
const Clock = require("../../../../../lib/utils/Clock");
const { OpenShuttersMorningGoal } = require("../Goals");

/**
 * @class OpenAllShuttersMorningIntention
 *
 * This intention is responsible to open all shutters
 * in the morning at the given hour by the goal.
 */
class OpenAllShuttersMorningIntention extends Intention {

    static applicable(goal) {
        return goal instanceof OpenShuttersMorningGoal;
    }

    /**
     * Opens all shutters of the room.
     */
    #openAllShutters() {
        this.agent.room.shutters.forEach((shutter) => {
            try {
              shutter.open();
            } catch (err) {
              this.log(err);
            }
        });
    }

    /**
     * Update the agents beliefs.
     */
    #updateAgentBeliefs() {
        this.agent.beliefs.declare("open shutters");
    }

    *exec() {
        let hh = this.goal.parameters["hh"];
        let mm = this.goal.parameters["mm"];
        while (true) {
            yield;
            if (Clock.global.hh == hh && Clock.global.mm == mm) {
                this.#openAllShutters();
                this.#updateAgentBeliefs();
                break;
            }
        }
    }
}

module.exports = OpenAllShuttersMorningIntention;
