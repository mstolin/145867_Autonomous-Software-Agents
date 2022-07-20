const Intention = require("../../../../../lib/bdi/Intention");
const PlanningGoal = require("../../../../../lib/pddl/PlanningGoal");
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

    #genWakeUpPlanningGoal() {
        return new PlanningGoal({
            goal: [
                "on mainLight",
                "morning-temp mainLight",
                "morning-brightness mainLight",
            ],
        });
    }

    *exec() {
        let hh = this.goal.parameters["hh"];
        let mm = this.goal.parameters["mm"];
        while (true) {
            yield;
            if (Clock.global.hh == hh && Clock.global.mm == mm) {
                this.agent.postSubGoal(this.#genWakeUpPlanningGoal());
                break; // TODO maybe remove this to make it recurrent
            }
        }
    }
}

module.exports = WakeUpIntention;
