const Intention = require("../../../../../lib/bdi/Intention");
const PlanningGoal = require("../../../../../lib/pddl/PlanningGoal");
const { SenseIlluminanceGoal } = require("../Goals");
const shutterAgents = require("../../shutter-agent");
const house = require("../../../../world/House");

class SenseIlluminanceIntention extends Intention {
    static applicable(goal) {
        return goal instanceof SenseIlluminanceGoal;
    }

    /**
     * Generates planning goal that opens the shutter.
     *
     * @param {number} outdoorIlluminence
     *
     * @returns
     */
    #genShutterGoal(outdoorIlluminence) {
        if (outdoorIlluminence < 0.25 || outdoorIlluminence >= 0.75) {
            // Its either too dark or too bright, close the shutters at least halfway
            return new PlanningGoal({
                goal: ["openHalf shutters", "not (openFull shutters)"],
            });
        } else {
            // fully open
            return new PlanningGoal({
                goal: ["openFull shutters", "not (openHalf shutters)"],
            });
        }
    }

    #genIlluminancePromise(agents) {
        let promise = new Promise(async (_) => {
            while (true) {
                let outdoorIlluminence =
                    await house.illuminanceSensor.notifyChange("illuminence");
                for (const agent of Object.values(agents)) {
                    if (agent.beliefs.check("on shutters")) {
                        // Only if shutters have been turned on
                        let goal = this.#genShutterGoal(outdoorIlluminence);
                        agent.postSubGoal(goal);
                    }
                }
            }
        });
        return promise;
    }

    *exec() {
        let illuminanceGoal = this.#genIlluminancePromise(shutterAgents);
        yield Promise.resolve(illuminanceGoal);
    }
}

module.exports = SenseIlluminanceIntention;
