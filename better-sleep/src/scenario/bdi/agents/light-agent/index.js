const LightAgent = require("../../../../lib/bdi/LightAgent");
const { initIntentions } = require("./intentions");
const {
    AdjustLightOffGoal,
    TurnLightOnGoal,
    TurnLightOffGoal,
} = require("./goals");

/**
 * Initiates a LightAgent instance.
 * 
 * @param {Room} room 
 * @returns {LightAgent}
 */
function initLightAgent(room) {
    let agent = new LightAgent(`LightAgent-${room.name}`, room);
    let intentions = initIntentions(room.name);
    for (const intention of intentions) {
        agent.intentions.push(intention);
    }
    return agent;
}

/**
 * Initiates a LightAgent instance for each room
 * of the given house.
 * 
 * @param {House} house 
 * @returns {Object<string, LightAgent>}
 */
function initLightAgents(house) {
    let lightAgents = Object.keys(house.rooms).map((roomId) => {
        let room = house.getRoom(roomId);
        let agent = initLightAgent(room);
        return { [roomId]: agent };
    });
    return Object.assign({}, ...lightAgents);
}

module.exports = {
    initLightAgents,
    AdjustLightOffGoal,
    TurnLightOnGoal,
    TurnLightOffGoal,
};
