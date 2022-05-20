const Agent = require("../../../../lib/bdi/Agent");
const intentions = require("./intentions");
const beliefs = require("./Beliefs");

let houseAgent = new Agent("House Agent", beliefs);
// add all intentions
for (let intention of intentions) {
    houseAgent.intentions.push(intention);
}

module.exports = houseAgent;
