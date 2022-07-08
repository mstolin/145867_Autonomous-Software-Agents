// TODO IlluminanceIntention
// Ideally we have a Sun/Moon according to the daytime
// We calculate the illuminance of the room according to the light brightness,
// and the outside brigtness.
// Then we adjust the room light brightness accordingly.

const Intention = require("../../../../../lib/bdi/Intention");
const PlanningGoal = require("../../../../../lib/pddl/PlanningGoal");
const { SenseIlluminanceGoal } = require("../Goals");
const shutterAgents = require("../../shutter-agent");
const house = require("../../../../world/House");

/**
 * Other idea,
 * illuminence is number between 0 and 1
 * 0 is the less illuminence possible, 1 the most
 * everything > 0.75 is too annoying
 * everuthing < 0.25 is too dark, makes no sense to let shutters open
 *
 * if i > 0.75 and daytime != evening halfway open
 * if i < 0.25 and daytime != evening halfway open, otherwise close
 */
const FULLY_OPENED = "open";
const HALFWAY_OPENED = "closed";

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
        goal: ["open shutters", "halfwayOpen shutters"],
      });
    } else {
      // fully open
      return new PlanningGoal({
        goal: ["open shutters", "not (halfwayOpen shutters)"],
      });
    }
  }

  #genPromise(agent) {
    let promise = new Promise(async (_) => {
      while (true) {
        let outdoorIlluminence = await house.illuminanceSensor.notifyChange(
          "illuminence"
        );
        if (!agent.beliefs.check("EVENING time")) {
          console.log("IS NOT EVENING !!!!!!")
          // shutters are supposed to be closed in the evening anyway
          let goal = this.#genShutterGoal(outdoorIlluminence);
          this.agent.postSubGoal(goal);
        }
      }
    });
    return promise;
  }

  *exec() {
    let goals = [];
    for (const agent of Object.values(shutterAgents)) {
      let goal = this.#genPromise(agent);
      goals.push(goal);
    }
    yield Promise.all(goals);
  }
}

module.exports = SenseIlluminanceIntention;
