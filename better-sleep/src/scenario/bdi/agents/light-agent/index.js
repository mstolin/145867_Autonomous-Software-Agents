const LightAgent = require("../../../../lib/bdi/LightAgent");
const { initIntentions } = require("./intentions");

const initLightAgent = (house) => {
    let intentions = initIntentions(house);
    let agent = new LightAgent("Light-Agent");
    for (room of Object.values(house.rooms)) {
        agent.addRoom(room);
    }
    for (const intention of intentions) {
        agent.intentions.push(intention);
    }
    return agent;
};

module.exports = { initLightAgent };