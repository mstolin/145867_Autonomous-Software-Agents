const Intention = require("../../../../../lib/bdi/Intention");
const PlanningGoal = require("../../../../../lib/pddl/PlanningGoal");
const Clock = require("../../../../../lib/utils/Clock");
const { SenseDaytimeGoal } = require("../Goals");
const roomAgent = require("../../room-agent");
const roomIds = require("../../../../world/rooms/RoomIds");
const { TurnLightOnGoal, TurnLightOffGoal } = require("../../room-agent/Goals");
const shutterAgents = require("../../shutter-agent");
const RoomAgent = require("../../../../../lib/bdi/RoomAgent");
const ShutterAgent = require("../../../../../lib/bdi/ShutterAgent");
const { TurnOnShuttersGoal, TurnOffShuttersGoal } = require("../../shutter-agent/Goals");
const Agent = require("../../../../../lib/bdi/Agent");

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
     * Post goal to the room agent to turn off
     * the main light.
     *
     * @param {RoomAgent} agent
     * @returns {Promise<boolean>}
     */
    #turnOffMainLight(agent, mainLight) {
        return agent.postSubGoal(new TurnLightOffGoal({mainLight}));
    }

    /**
     * Post goal to the room agent to turn on
     * the main light.
     *
     * @param {RoomAgent} agent
     * @returns {Promise<boolean>}
     */
    #turnOnMainLight(agent, mainLight) {
        return agent.postSubGoal(new TurnLightOnGoal({mainLight}));
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

    #postLightGoalsIfNeeded(room) {
        let time = Clock.global;
        if (time.hh == 7 && time.mm == 0) {
            // Time to wake up
            this.#turnOnMainLight(room.lightAgent, room.mainLight).then((_) => {
                if (room.name == roomIds.ID_ROOM_BEDROOM) {
                    // Adjust light only if bedroom agent
                    room.lightAgent.postSubGoal(this.#genAdjustLightMorningGoal(room.mainLight));
                }
            });
        } else if (time.hh == 23 && time.mm == 0) {
            // Time to sleep, no need for a PDDL intention here
            this.#turnOffMainLight(room.lightAgent, room.mainLight);
        }
    }

    /**
     * Post turn on goal to the given shutter agent.
     * 
     * @param {ShutterAgent} agent 
     * @returns {Promise<boolean>}
     */
    #turnOnShutter(agent) {
        return agent.postSubGoal(new TurnOnShuttersGoal());
    }

    /**
     * Post turn off goal to the given shutter agent.
     * 
     * @param {ShutterAgent} agent 
     * @returns {Promise<boolean>}
     */
    #turnOffShutter(agent) {
        return agent.postSubGoal(new TurnOffShuttersGoal());
    }

    #postShutterGoalsIfNeeded(agent) {
        let time = Clock.global;
        if (time.hh == 7 && time.mm == 0) {
            // Turn all shutters on
            this.#turnOnShutter(agent)
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
    #genClockSensor(house) {
        let promise = new Promise(async (_) => {
            while (true) {
                let hour = await Clock.global.notifyChange("hh");
                let daytime = this.#getDaytimeForTime(hour);
                /*for (const agent of agents) {
                    // 1. Update belief
                    this.#updateDaytimeBeliefs(daytime, agent);
                    // 2. Turn on all lights
                    if (agent instanceof RoomAgent) {
                        this.#postLightGoalsIfNeeded(agent);
                    }
                    // 3. Turn on all shutters
                    if (agent instanceof ShutterAgent) {
                        this.#postShutterGoalsIfNeeded(agent);
                    }
                }*/
                for (const room of Object.values(house.rooms)) {
                    // 1. Update belief
                    this.#updateDaytimeBeliefs(daytime, room.agents);
                    // 2. Turn on all lights
                    this.#postLightGoalsIfNeeded(room);
                    // 3. Turn on all shutters
                    //this.#postShutterGoalsIfNeeded(room.shutterAgent);
                }
            }
        });
        return promise;
    }

    *exec(params) {
        /*let agents = [
            //...Object.values(roomAgents),
            roomAgent,
            ...Object.values(shutterAgents),
        ];
        let clockGoal = this.#genClockSensor(agents);
        yield Promise.resolve(clockGoal);*/
        let house = params.house;
        let clockGoal = this.#genClockSensor(house);
        yield Promise.resolve(clockGoal);
    }
}

module.exports = SenseDaytimeIntention;
