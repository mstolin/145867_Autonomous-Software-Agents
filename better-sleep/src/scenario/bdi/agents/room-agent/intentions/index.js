const TurnOnIntention = require("./TurnOnIntention");
const TurnOffIntention = require("./TurnOffIntention");
const AdjustMorningLightTemperatureIntention = require("./AdjustMorningLightTemperatureIntention");
const AdjustAfternoonLightTemperatureIntention = require("./AdjustAfternoonLightTemperatureIntention");
const AdjustEveningLightTemperatureIntention = require("./AdjustEveningLightTemperatureIntention");

let { PlanningIntention } = require("../../../../../lib/pddl/Blackbox")([
    TurnOnIntention,
    TurnOffIntention,
    AdjustMorningLightTemperatureIntention,
    AdjustAfternoonLightTemperatureIntention,
    AdjustEveningLightTemperatureIntention,
]);

module.exports = [PlanningIntention];
