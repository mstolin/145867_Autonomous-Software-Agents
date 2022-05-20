const Agent = require("../../../../lib/bdi/Agent");
const intentions = require("./Intentions");
const roomIds = require("../../../world/rooms/RoomIds");
const rooms = require("../../../world/rooms");

const initRoomAgent = (id, room) => { // TODO MAKE Custom class RoomAgent with room param
    let agent = new Agent(`Room-Agent-${id}`);
    for (const intention of intentions) {
        agent.intentions.push(intention);
    }
    agent.room = room;
    return agent;
};

let roomAgents = {};
for (const id of Object.values(roomIds)) {
    let room = rooms[id];
    roomAgents[id] = initRoomAgent(id, room);
}

module.exports = roomAgents;
