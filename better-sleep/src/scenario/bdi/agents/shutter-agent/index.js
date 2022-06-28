const ShutterAgent = require("../../../../lib/bdi/ShutterAgent");
const intentions = require("./intentions");
const rooms = require("../../../world/rooms");

const initShutterAgent = (room) => {
    let agent = new ShutterAgent(`Shutter-Agent-${room.name}`, room);
    for (const intention of intentions) {
        agent.intentions.push(intention);
    }
    return agent;
};

let shutterAgents = {};
for (const room of Object.values(rooms)) {
    shutterAgents[room.name] = initShutterAgent(room);
}

module.exports = shutterAgents;
