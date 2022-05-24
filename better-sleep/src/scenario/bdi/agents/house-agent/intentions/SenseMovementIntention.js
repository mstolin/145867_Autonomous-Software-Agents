const Intention = require("../../../../../lib/bdi/Intention");
const PlanningGoal = require("../../../../../lib/pddl/PlanningGoal");
const { SenseMovementGoal } = require("../Goals");
const roomAgents = require("../../room-agent");
const Clock = require("../../../../../lib/utils/Clock");

const MORNING = "MORNING";
const AFTERNOON = "AFTERNOON";
const EVENING = "EVENING";

/**
 * @class
 *
 * This intention works as a sensor.
 * It is supposed to tell a specific room agent if a resident
 * entered or left the room.
 * According to this info, it posts a subgoal to either turn
 * on or off the light, and adjust the light according to the
 * current daytime.
 */
class SenseMovementIntention extends Intention {
    static applicable(goal) {
        return goal instanceof SenseMovementGoal;
    }

    /**
     * Returns the daytime string for the
     * given hour of the current time.
     *
     * @param {int} hour
     * @returns Daytime string
     */
    #getDaytimeForTime(hour) {
        if (hour >= 1 && hour < 2) {
            return MORNING;
        } else if (hour >= 2 && hour < 4) {
            return AFTERNOON;
        } else {
            return EVENING;
        }
    }

    /**
     * Generates a planning goal that turns on the
     * main light.
     *
     * @param {string} daytime Current daytime as string
     * @returns
     */
    #genTurnOnPlanningGoal(daytime) {
        let daytimeLower = daytime.toLowerCase();
        return new PlanningGoal({
            goal: [
                "on mainLight",
                `${daytimeLower}-temp mainLight`,
                `${daytimeLower}-brightness mainLight`,
            ],
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
            goal: ["not (on mainLight)"],
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
                let daytime = this.#getDaytimeForTime(Clock.global.hh);

                if (isOccupied) {
                    // update belief
                    roomAgent.beliefs.undeclare("free thisRoom");
                    // turn light on
                    roomAgent.postSubGoal(this.#genTurnOnPlanningGoal(daytime));
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
