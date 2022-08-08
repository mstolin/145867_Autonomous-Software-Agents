const Intention = require("../../../../../lib/bdi/Intention");
const PlanningGoal = require("../../../../../lib/pddl/PlanningGoal");
const { SenseIlluminanceGoal } = require("../goals");

/**
 * @class SenseIlluminanceIntention
 *
 * This is a sensor intention.
 * The goal is to push goals to the sensor agent, to 
 * trigger intentions to open or close the shutters
 * according to the outdoor illuminence.
 */
class SenseIlluminanceIntention extends Intention {
    static applicable(goal) {
        return goal instanceof SenseIlluminanceGoal;
    }

    /**
     * Generate a planning goal that either fully opens, half opens,
     * or closes all shutter according to the given outdoor illuminence.
     *
     * @param {number} outdoorIlluminence
     *
     * @returns {PlanningGoal}
     */
    #genShutterGoal(outdoorIlluminence) {
        let goal = [];
        if (outdoorIlluminence >= 0 && outdoorIlluminence <= 0.3) {
            // Very dark, probably evening => Close shutters
            goal.push(
                "closed shutters",
                "not (openFull shutters)",
                "not (openHalf shutters)"
            );
        } else if (outdoorIlluminence > 0.3 && outdoorIlluminence <= 0.6) {
            // Very cloudy, maybe its raining => Open half
            goal.push(
                "openHalf shutters",
                "not (openFull shutters)",
                "not (closed shutters)"
            );
        } else {
            // Sunny day => Open full
            goal.push(
                "openFull shutters",
                "not (openHalf shutters)",
                "not (closed shutters)"
            );
        }

        return new PlanningGoal({
            goal,
        });
    }

    /**
     * Pushes a goal to the shutter agents when the outdoor
     * illuminence changes.
     *
     * @param {House} house
     * @returns  {Promise}
     */
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
