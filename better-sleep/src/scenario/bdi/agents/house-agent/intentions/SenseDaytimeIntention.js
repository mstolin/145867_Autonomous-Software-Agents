const Intention = require("../../../../../lib/bdi/Intention");
const Clock = require("../../../../../lib/utils/Clock");
const { SenseDaytimeGoal } = require("../Goals");
const roomAgents = require("../../room-agent");

const MORNING = "MORNING";
const AFTERNOON = "AFTERNOON";
const EVENING = "EVENING";

/**
 * @class
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
        agent.beliefs.undeclare(`${AFTERNOON} time`);
        agent.beliefs.declare(`${MORNING} time`);
    }

    /**
     * Update the agent to believe its afternoon.
     *
     * @param {Agent} agent
     */
    #declareAfternoon(agent) {
        agent.beliefs.undeclare(`${EVENING} time`);
        agent.beliefs.undeclare(`${MORNING} time`);
        agent.beliefs.declare(`${AFTERNOON} time`);
    }

    /**
     * Update the agent to believe its evening.
     *
     * @param {Agent} agent
     */
    #declareEvening(agent) {
        agent.beliefs.undeclare(`${MORNING} time`);
        agent.beliefs.undeclare(`${AFTERNOON} time`);
        agent.beliefs.declare(`${EVENING} time`);
    }

    /**
     * Update all room agents belief according
     * to the current daytime.
     *
     * @param {string} daytime
     */
    #updateDaytimeBeliefs(daytime) {
        for (const agent of Object.values(roomAgents)) {
            if (daytime === MORNING) {
                this.#declareMorning(agent);
            } else if (daytime === AFTERNOON) {
                this.#declareAfternoon(agent);
            } else if (daytime === EVENING) {
                this.#declareEvening(agent);
            }
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
        if (hour >= 1 && hour < 2) {
            return MORNING;
        } else if (hour >= 2 && hour < 4) {
            return AFTERNOON;
        } else {
            return EVENING;
        }
    }

    /**
     * Generates a promise, used to observe the daytime
     * and update all room agents beliefs.
     *
     * @returns Promise to update all room agent beliefs
     */
    #genClockPromise() {
        let goalPromise = new Promise(async (_) => {
            while (true) {
                let hour = await Clock.global.notifyChange("hh");
                let daytime = this.#getDaytimeForTime(hour);
                this.#updateDaytimeBeliefs(daytime);
            }
        });
        return goalPromise;
    }

    *exec() {
        let clockGoal = this.#genClockPromise();
        yield Promise.resolve(clockGoal);
    }
}

module.exports = SenseDaytimeIntention;