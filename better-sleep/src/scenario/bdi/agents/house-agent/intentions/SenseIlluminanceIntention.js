const Intention = require("../../../../../lib/bdi/Intention");
const PlanningGoal = require("../../../../../lib/pddl/PlanningGoal");
const { SenseIlluminanceGoal } = require("../goals");

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
        let goal = [];
        if (outdoorIlluminence >= 0 && outdoorIlluminence <= 0.3) {
            // Very dark, probably evening => Close shutters
            goal.push("closed shutters", "not (openFull shutters)", "not (openHalf shutters)");
        } else if (outdoorIlluminence > 0.3 && outdoorIlluminence <= 0.6) {
            // Very cloudy, maybe its raining => Open half
            goal.push("openHalf shutters", "not (openFull shutters)", "not (closed shutters)");
        } else {
            // Sunny day => Open full
            goal.push("openFull shutters", "not (openHalf shutters)", "not (closed shutters)");
        }

        return new PlanningGoal({
            goal
        });
    }

    #genIlluminancePromise(house) {
        let promise = new Promise(async (_) => {
            while (true) {
                let outdoorIlluminence =
                    await house.illuminanceSensor.notifyChange("illuminence");
                for (const room of Object.values(house.rooms)) {
                    let shutterAgent = room.shutterAgent;
                    if (shutterAgent.beliefs.check("on shutters")) {
                        // Only if shutters have been turned on
                        let goal = this.#genShutterGoal(outdoorIlluminence);
                        shutterAgent.postSubGoal(goal);
                    }
                }
            }
        });
        return promise;
    }

    *exec(params) {
        let house = params.house;
        let illuminanceGoal = this.#genIlluminancePromise(house);
        yield Promise.resolve(illuminanceGoal);
    }
}

module.exports = SenseIlluminanceIntention;
