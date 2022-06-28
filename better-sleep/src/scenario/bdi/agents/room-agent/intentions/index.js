const WakeUpIntention = require("./WakeUpIntention");
const SleepIntention = require("./SleepIntention");
const TurnOnIntention = require("./TurnOnIntention");
const TurnOffIntention = require("./TurnOffIntention");
const AdjustMorningLightTemperatureIntention = require("./AdjustMorningLightTemperatureIntention");
const AdjustAfternoonLightTemperatureIntention = require("./AdjustAfternoonLightTemperatureIntention");
const AdjustEveningLightTemperatureIntention = require("./AdjustEveningLightTemperatureIntention");
const AdjustMorningLightBrightnessIntention = require("./AdjustMorningLightBrightnessIntention");
const AdjustAfternoonLightBrightnessIntention = require("./AdjustAfternoonLightBrightnessIntention");
const AdjustEveningLightBrightnessIntention = require("./AdjustEveningLightBrightnessIntention");

let { PlanningIntention } = require("../../../../../lib/pddl/Blackbox")([
    TurnOnIntention,
    TurnOffIntention,
    AdjustMorningLightTemperatureIntention,
    AdjustAfternoonLightTemperatureIntention,
    AdjustEveningLightTemperatureIntention,
    AdjustMorningLightBrightnessIntention,
    AdjustAfternoonLightBrightnessIntention,
    AdjustEveningLightBrightnessIntention,
]);

module.exports = [
    PlanningIntention, 
    WakeUpIntention, 
    SleepIntention
];
