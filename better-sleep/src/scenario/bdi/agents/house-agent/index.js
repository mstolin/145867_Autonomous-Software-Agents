const Agent = require("../../../../lib/bdi/Agent");
const intentions = require("./intentions");
const BeliefSet = require("../../../../lib/bdi/Beliefset");
const {
    SenseMovementGoal,
    SenseDaytimeGoal,
    SenseIlluminanceGoal,
} = require("./goals");

/**
 * Initiates an instance of an Agent that will serve
 * as the House-Agent.
 * 
 * @returns {Agent}
 */
const initHouseAgent = () => {
    let houseAgent = new Agent("House-Agent", new BeliefSet());
    // add all intentions
    for (let intention of intentions) {
        houseAgent.intentions.push(intention);
    }
    return houseAgent;
};

module.exports = {
    initHouseAgent,
    SenseMovementGoal,
    SenseDaytimeGoal,
    SenseIlluminanceGoal,
};
