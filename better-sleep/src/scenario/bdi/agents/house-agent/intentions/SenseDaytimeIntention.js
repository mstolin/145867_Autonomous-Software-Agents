const Intention = require("../../../../../lib/bdi/Intention");
const PlanningGoal = require("../../../../../lib/pddl/PlanningGoal");
const Clock = require("../../../../../lib/utils/Clock");
const { SenseDaytimeGoal } = require("../Goals");
const roomAgents = require("../../room-agent");
const roomIds = require("../../../../world/rooms/RoomIds");
const shutterAgents = require("../../shutter-agent");

const MORNING = "MORNING";
const AFTERNOON = "AFTERNOON";
const EVENING = "EVENING";

/**
 * @class SenseDaytimeIntention
 *
 * This intention works as a sensor.
 * It is supposed to tell a specific room
 * agent the current daytime, morning, afternoon, evening.
 */
class SenseDaytimeIntention extends Intention {
    static applicable(goal) {
        return goal instanceof SenseDaytimeGoal;
    }

    /**
     * Update the agent to beliefe its morning.
     *
     * @param {Agent} agent
     */
    #declareMorning(agent) {
        agent.beliefs.undeclare(`${EVENING} time`);
        agent.beliefs.declare(`${MORNING} time`);
    }

    /**
     * Update the agent to believe its afternoon.
     *
     * @param {Agent} agent
     */
    #declareAfternoon(agent) {
        agent.beliefs.undeclare(`${MORNING} time`);
        agent.beliefs.declare(`${AFTERNOON} time`);
    }

    /**
     * Update the agent to believe its evening.
     *
     * @param {Agent} agent
     */
    #declareEvening(agent) {
        agent.beliefs.undeclare(`${AFTERNOON} time`);
        agent.beliefs.declare(`${EVENING} time`);
    }

    /**
     * Update all room agents belief according
     * to the current daytime.
     *
     * @param {string} daytime
     * @param {Agent} agent
     */
    #updateDaytimeBeliefs(daytime, agent) {
        if (daytime === MORNING) {
            this.#declareMorning(agent);
        } else if (daytime === AFTERNOON) {
            this.#declareAfternoon(agent);
        } else if (daytime === EVENING) {
            this.#declareEvening(agent);
        }
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

    #turnOffMainLight(agent) {
        try {
            agent.room.mainLight.turnOff();
            agent.beliefs.undeclare("on mainLight");
        } catch(err) {
            this.log(err);
        }
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

    #pushSleepGoalsIfNeeded(agent) {
        let time = Clock.global;
        if (time.hh == 7 && time.mm == 0) {
            // Time to wake up
            agent.postSubGoal(this.#genWakeUpPlanningGoal());
        } else if (time.hh == 23 && time.mm == 0) {
            // Time to sleep, no need for a PDDL intention here
            this.#turnOffMainLight(agent);
        }
    }

    /**
     * Generates a promise, used to observe the daytime
     * and update all room agents beliefs.
     *
     * @returns Promise to update all room agent beliefs
     */
    #genClockSensor(agents) {
        let promise = new Promise(async (_) => {
            while (true) {
                let hour = await Clock.global.notifyChange("hh");
                let daytime = this.#getDaytimeForTime(hour);
                for (const agent of agents) {
                    // 1. Update belief
                    this.#updateDaytimeBeliefs(daytime, agent);
                    // 2. Only for bedroom agent, push sleep goal
                    if (agent == roomAgents[roomIds.ID_ROOM_BEDROOM]) {
                        this.#pushSleepGoalsIfNeeded(agent);
                    }
                }
            }
        });
        return promise;
    }

    *exec() {
        let agents = [
            ...Object.values(roomAgents),
            ...Object.values(shutterAgents),
        ];
        let clockGoal = this.#genClockSensor(agents);
        yield Promise.resolve(genClockSensor);
    }
}

module.exports = SenseDaytimeIntention;
