const LightAgent = require("../../../../lib/bdi/LightAgent");
const { initIntentions } = require("./intentions");

function initLightAgent(room) {
    let agent = new LightAgent(`${room.name}-LightAgent`, room);
    let intentions = initIntentions(room.name);
    for (const intention of intentions) {
        agent.intentions.push(intention);
    }
    return agent;
}

function initLightAgents(house) {
    let lightAgents = Object.keys(house.rooms).map((roomId) => {
        let room = house.getRoom(roomId);
        let agent = initLightAgent(room);
        return { [roomId]: agent };
    });
    return Object.assign({}, ...lightAgents);
}

module.exports = { initLightAgents };
