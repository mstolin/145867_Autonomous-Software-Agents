const Agent = require("../../../../lib/bdi/Agent");
const intentions = require("./Intentions");
const roomIds = require("../../../world/rooms/RoomIds");

const initRoomAgent = (id) => {
    let agent = new Agent(`Room-Agent-${id}`);
    for (const intention of intentions) {
        agent.intentions.push(intention);
    }
    return agent;
};

let roomAgents = {}
for(const id of Object.values(roomIds)) {
    roomAgents[id] = initRoomAgent(id);
}

module.exports = roomAgents;
