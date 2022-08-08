const ShutterAgent = require("../../../../lib/bdi/ShutterAgent");
const { initIntentions } = require("./intentions");
const { TurnOnShuttersGoal, TurnOffShuttersGoal } = require("./goals");

/**
 * Initiates an instance of ShutterAgent.
 *
 * @param {Room} room
 * @param {Array<Intention>} intentions
 * @returns {ShutterAgent}
 */
function initShutterAgent(room, intentions) {
    let agent = new ShutterAgent(`ShutterAgent-${room.name}`, room);
    for (const intention of intentions) {
        agent.intentions.push(intention);
    }
    return agent;
}

/**
 * Initiates a ShutterAgent instance for each room
 * of the given house.
 *
 * @param {House} house
 * @returns {Object<string, ShutterAgent>}
 */
function initShutterAgents(house) {
    let intentions = initIntentions();
    let shutterAgents = Object.keys(house.rooms).map((roomId) => {
        let room = house.getRoom(roomId);
        let agent = initShutterAgent(room, intentions);
        return { [roomId]: agent };
    });
    return Object.assign({}, ...shutterAgents);
}

module.exports = { initShutterAgents, TurnOnShuttersGoal, TurnOffShuttersGoal };
