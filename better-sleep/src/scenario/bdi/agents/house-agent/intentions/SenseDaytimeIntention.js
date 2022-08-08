const Intention = require("../../../../../lib/bdi/Intention");
const PlanningGoal = require("../../../../../lib/pddl/PlanningGoal");
const Clock = require("../../../../../lib/utils/Clock");
const LightAgent = require("../../../../../lib/bdi/LightAgent");
const ShutterAgent = require("../../../../../lib/bdi/ShutterAgent");
const Agent = require("../../../../../lib/bdi/Agent");
const { SenseDaytimeGoal } = require("../goals");
const { TurnLightOnGoal, TurnLightOffGoal } = require("../../light-agent");
const {
    TurnOnShuttersGoal,
    TurnOffShuttersGoal,
} = require("../../shutter-agent");
const { roomIds } = require("../../../../world/rooms");

const MORNING = "MORNING";
const AFTERNOON = "AFTERNOON";
const EVENING = "EVENING";

/**
 * This intention works as a sensor.
 * It is supposed to update all light agents and shutter agents
 * beliefs to the current daytime, morning, afternoon, evening.
 *
 * In addition, it starts the intentions for all light agents
 * to either turn on or off the light, as well as for all shutter
 * agents to turn on or off all shutters.
 * @class
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
     * Update all agents belief according
     * to the current daytime.
     *
     * @param {string} daytime
     * @param {Array<Agent>} agent
     */
    #updateDaytimeBeliefs(daytime, agents) {
        for (const agent of agents) {
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
     * @returns {string}
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
     * Start light agent intention to turn off
     * the main light.
     *
     * @param {LightAgent} agent
     * @returns {Promise<boolean>}
     */
    #turnOffMainLight(agent, mainLight) {
        return agent.postSubGoal(new TurnLightOffGoal({ mainLight }));
    }

    /**
     * Start light agent intention to turn on
     * the main light.
     *
     * @param {LightAgent} agent
     * @returns {Promise<boolean>}
     */
    #turnOnMainLight(agent, mainLight) {
        return agent.postSubGoal(new TurnLightOnGoal({ mainLight }));
    }

    /**
     * Generates a PDDL planning goal that adjusts
     * the temperature and brightness for the morning.
     *
     * @returns {PlanningGoal}
     */
    #genAdjustLightMorningGoal(mainLight) {
        return new PlanningGoal({
            goal: [
                `morning-temp ${mainLight.name}`,
                `morning-brightness ${mainLight.name}`,
            ],
        });
    }

    /**
     * Start light agent intentions if needed.
     *
     * @param {Room} room
     */
    #postLightGoalsIfNeeded(room) {
        let time = Clock.global;
        if (time.hh == 7 && time.mm == 0) {
            // Time to wake up
            this.#turnOnMainLight(room.lightAgent, room.mainLight).then((_) => {
                if (room.name == roomIds.ID_ROOM_BEDROOM) {
                    // Adjust light only if bedroom agent
                    room.lightAgent.postSubGoal(
                        this.#genAdjustLightMorningGoal(room.mainLight)
                    );
                }
            });
        } else if (time.hh == 23 && time.mm == 0) {
            // Time to sleep, no need for a PDDL intention here
            this.#turnOffMainLight(room.lightAgent, room.mainLight);
        }
    }

    /**
     * Start shutter agent intention to turn on
     * the shutter.
     *
     * @param {ShutterAgent} agent
     * @returns {Promise<boolean>}
     */
    #turnOnShutter(agent) {
        return agent.postSubGoal(new TurnOnShuttersGoal());
    }

    /**
     * Start shutter agent intention to turn off
     * the shutter.
     *
     * @param {ShutterAgent} agent
     * @returns {Promise<boolean>}
     */
    #turnOffShutter(agent) {
        return agent.postSubGoal(new TurnOffShuttersGoal());
    }

    /**
     * Start shutter agent intentions if needed.
     *
     * @param {ShutterAgent} agent
     */
    #postShutterGoalsIfNeeded(agent) {
        let time = Clock.global;
        if (time.hh == 7 && time.mm == 0) {
            // Turn all shutters on
            this.#turnOnShutter(agent);
        } else if (time.hh == 23 && time.mm == 0) {
            // Turn all shutters off
            this.#turnOffShutter(agent);
        }
    }

    /**
     * Generates a promise, used to observe the daytime
     * and update all room agents beliefs.
     *
     * @returns Promise to update all room agent beliefs
     */
    #genClockSensor(rooms) {
        let promise = new Promise(async (_) => {
            while (true) {
                let hour = await Clock.global.notifyChange("hh");
                let daytime = this.#getDaytimeForTime(hour);
                for (const room of Object.values(rooms)) {
                    // 1. Update belief
                    this.#updateDaytimeBeliefs(daytime, room.agents);
                    // 2. Turn on all lights
                    this.#postLightGoalsIfNeeded(room);
                    // 3. Turn on all shutters
                    this.#postShutterGoalsIfNeeded(room.shutterAgent);
                }
            }
        });
        return promise;
    }

    *exec(params) {
        let rooms = params.rooms;
        let clockGoal = this.#genClockSensor(rooms);
        yield Promise.resolve(clockGoal);
    }
}

module.exports = SenseDaytimeIntention;
