const RoomAgent = require("../../../../lib/bdi/RoomAgent");
const { initIntentions } = require("./intentions");

const initRoomAgent = (house) => {
    let intentions = initIntentions(house);
    let agent = new RoomAgent("Light-Agent");
    for (room of Object.values(house.rooms)) {
        agent.addRoom(room);
    }
    for (const intention of intentions) {
        agent.intentions.push(intention);
    }
    return agent;
};

module.exports = { initRoomAgent };
