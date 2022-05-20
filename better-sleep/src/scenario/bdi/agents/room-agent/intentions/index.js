const TurnOnIntention = require("./TurnOnIntention");
const AdjustMorningLightIntention = require("./AdjustMorningLightIntention");
const AdjustAfternoonLightIntention = require("./AdjustAfternoonLightIntention");
const AdjustEveningLightIntention = require("./AdjustEveningLightIntention");

let { PlanningIntention } = require("../../../../../lib/pddl/Blackbox")([
    TurnOnIntention,
    AdjustMorningLightIntention,
    AdjustAfternoonLightIntention,
    AdjustEveningLightIntention,
]);

module.exports = [PlanningIntention];
