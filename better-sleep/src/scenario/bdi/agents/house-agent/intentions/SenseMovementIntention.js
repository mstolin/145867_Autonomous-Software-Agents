const Intention = require("../../../../../lib/bdi/Intention");
const PlanningGoal = require("../../../../../lib/pddl/PlanningGoal");
const { SenseMovementGoal } = require("../Goals");
const { AdjustLightOffGoal } = require("../../room-agent/Goals");
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
        if (hour >= 6 && hour < 12) {
            return MORNING;
        } else if (hour >= 12 && hour < 18) {
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
    #genAdjustGoal(daytime) {
        let daytimeLower = daytime.toLowerCase();
        return new PlanningGoal({
            goal: [
                `${daytimeLower}-temp mainLight`,
                `${daytimeLower}-brightness mainLight`,
            ],
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
    #genRoomPromise(agent) {
        let goalPromise = new Promise(async (_) => {
            while (true) {
                let room = agent.room;
                let isOccupied = await room.motionSensor.notifyChange(
                    "isOccupied"
                );
                let daytime = this.#getDaytimeForTime(Clock.global.hh);
                if (agent.beliefs.check("on mainLight")) {
                    if (isOccupied) {
                        agent.beliefs.undeclare("free thisRoom");
                        agent.postSubGoal(this.#genAdjustGoal(daytime));
                    } else {
                        agent.beliefs.declare("free thisRoom");
                        agent.postSubGoal(new AdjustLightOffGoal());
                    }
                }
            }
        });
        return goalPromise;
    }

    *exec() {
        /*let roomGoals = [];
        for (const agent of Object.values(roomAgents)) {
            let goal = this.#genRoomPromise(agent);
            roomGoals.push(goal);
        }
        yield Promise.all(roomGoals);*/
        // TODO Instead of agent give room as parameter + cross reference in room, room.lightAgent & agent.rooms
    }
}

module.exports = SenseMovementIntention;
