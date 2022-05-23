const Intention = require("../../../../../lib/bdi/Intention");
const PlanningGoal = require("../../../../../lib/pddl/PlanningGoal");
const { SenseMovementGoal } = require("../Goals");
const roomAgents = require("../../room-agent");
const house = require("../../../../world/House");

/**
 * @class
 *
 * This intention works as a sensor.
 * It is supposed to tell a specific room
 * agent if a resident entered or left
 * the room.
 * According to this info, it posts a subgoal
 * to either turn on or off the light.
 */
class SenseMovementIntention extends Intention {
    static applicable(goal) {
        return goal instanceof SenseMovementGoal;
    }

    /**
     * Generates a planning goal that turns on the
     * main light.
     * @returns
     */
    #genTurnOnPlanningGoal() {
        return new PlanningGoal({
            goal: [`on mainLight`],
        });
    }

    /**
     * Generates planning goal that turns off the main
     * light.
     *
     * @returns
     */
    #genTurnOffPlanningGoal() {
        return new PlanningGoal({
            goal: [`not (on mainLight)`],
        });
    }

    /**
     * Generates an async promise that is being used by
     * this intention to turn on/off the main light of
     * a specific room by the room agent.
     *
     * @param {Agent} roomAgent
     * @returns
     */
    #genRoomPromise(roomAgent) {
        let goalPromise = new Promise(async (_) => {
            while (true) {
                let room = roomAgent.room;
                let isOccupied = await room.motionSensor.notifyChange(
                    "isOccupied"
                );

                if (isOccupied) {
                    // update belief
                    roomAgent.beliefs.undeclare("free thisRoom");
                    // turn light on
                    roomAgent.postSubGoal(this.#genTurnOnPlanningGoal());
                } else {
                    // update belief
                    roomAgent.beliefs.declare("free thisRoom");
                    // turn light off
                    roomAgent.postSubGoal(this.#genTurnOffPlanningGoal());
                }
            }
        });
        return goalPromise;
    }

    *exec() {
        let roomGoals = [];
        for (const agent of Object.values(roomAgents)) {
            let goal = this.#genRoomPromise(agent);
            roomGoals.push(goal);
        }
        yield Promise.all(roomGoals);
    }
}

module.exports = SenseMovementIntention;
