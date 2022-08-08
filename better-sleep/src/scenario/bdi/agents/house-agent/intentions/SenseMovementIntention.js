const Intention = require("../../../../../lib/bdi/Intention");
const PlanningGoal = require("../../../../../lib/pddl/PlanningGoal");
const Clock = require("../../../../../lib/utils/Clock");
const { SenseMovementGoal } = require("../goals");
const { AdjustLightOffGoal } = require("../../light-agent");

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
    #genAdjustGoal(daytime, mainLight) {
        let daytimeLower = daytime.toLowerCase();
        return new PlanningGoal({
            goal: [
                `${daytimeLower}-temp ${mainLight}`,
                `${daytimeLower}-brightness ${mainLight}`,
            ],
        });
    }

    /**
     * Generates an async promise that is being used by
     * this intention to turn on/off the main light of
     * a specific room by the room agent.
     *
     * @param {Room} room
     * @returns
     */
    #genRoomPromise(room) {
        let lightAgent = room.lightAgent;

        let goalPromise = new Promise(async (_) => {
            while (true) {
                let isOccupied = await room.motionSensor.notifyChange(
                    "isOccupied"
                );
                let daytime = this.#getDaytimeForTime(Clock.global.hh);
                if (lightAgent.beliefs.check(`on ${room.mainLight.name}`)) {
                    if (isOccupied) {
                        lightAgent.beliefs.undeclare(`free ${room.name}`);
                        lightAgent.postSubGoal(
                            this.#genAdjustGoal(daytime, room.mainLight.name)
                        );
                    } else {
                        lightAgent.beliefs.declare(`free ${room.name}`);
                        lightAgent.postSubGoal(
                            new AdjustLightOffGoal({
                                mainLight: room.mainLight,
                            }),
                            room.mainLight.name
                        );
                    }
                }
            }
        });
        return goalPromise;
    }

    *exec(params) {
        let goals = [];
        let rooms = params.rooms;

        for (const room of Object.values(rooms)) {
            let roomGoal = this.#genRoomPromise(room);
            goals.push(roomGoal);
        }

        yield Promise.all(goals);
    }
}

module.exports = SenseMovementIntention;
