const Agent = require("../../../../lib/bdi/Agent");
const intentions = require("./intentions");
const beliefs = require("./Beliefs");

const initHouseAgent = () => {
    let houseAgent = new Agent("House-Agent", beliefs);
    // add all intentions
    for (let intention of intentions) {
        houseAgent.intentions.push(intention);
    }
    return houseAgent;
};

module.exports = { initHouseAgent };
