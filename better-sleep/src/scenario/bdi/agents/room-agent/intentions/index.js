const TurnLightOnIntention = require("./TurnLightOnIntention");
const TurnLightOffIntention = require("./TurnLightOffIntention");
const AdjustLightOffIntention = require("./AdjustLightOffIntention");
const AdjustMorningLightTemperatureIntention = require("./AdjustMorningLightTemperatureIntention");
const AdjustAfternoonLightTemperatureIntention = require("./AdjustAfternoonLightTemperatureIntention");
const AdjustEveningLightTemperatureIntention = require("./AdjustEveningLightTemperatureIntention");
const AdjustMorningLightBrightnessIntention = require("./AdjustMorningLightBrightnessIntention");
const AdjustAfternoonLightBrightnessIntention = require("./AdjustAfternoonLightBrightnessIntention");
const AdjustEveningLightBrightnessIntention = require("./AdjustEveningLightBrightnessIntention");

let { PlanningIntention } = require("../../../../../lib/pddl/Blackbox")([
    AdjustMorningLightTemperatureIntention,
    AdjustAfternoonLightTemperatureIntention,
    AdjustEveningLightTemperatureIntention,
    AdjustMorningLightBrightnessIntention,
    AdjustAfternoonLightBrightnessIntention,
    AdjustEveningLightBrightnessIntention,
]);

module.exports = [
    AdjustLightOffIntention,
    TurnLightOffIntention,
    TurnLightOnIntention,
    PlanningIntention,
];
