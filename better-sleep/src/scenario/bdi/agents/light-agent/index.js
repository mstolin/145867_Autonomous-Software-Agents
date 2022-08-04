const LightAgent = require("../../../../lib/bdi/LightAgent");
const { initIntentions } = require("./intentions");

const initLightAgent = (house) => {
    let intentions = initIntentions(house);
    let agent = new LightAgent("Light-Agent", house.rooms);
    for (const intention of intentions) {
        agent.intentions.push(intention);
    }
    return agent;
};

module.exports = { initLightAgent };
