const TurnLightOnIntention = require("./TurnLightOnIntention");
const TurnLightOffIntention = require("./TurnLightOffIntention");
const AdjustLightOffIntention = require("./AdjustLightOffIntention");
const PDDLIntentionFactory = require("./pddlIntentions/PddlIntentionFactory");

function initIntentions(roomId) {
    return [
        AdjustLightOffIntention,
        TurnLightOffIntention,
        TurnLightOnIntention,
        PDDLIntentionFactory.genPDDLIntentions(roomId),
    ];
}

module.exports = { initIntentions };
