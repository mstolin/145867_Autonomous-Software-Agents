const TurnLightOnIntention = require("./TurnLightOnIntention");
const TurnLightOffIntention = require("./TurnLightOffIntention");
const AdjustLightOffIntention = require("./AdjustLightOffIntention");

const initIntentions = (house) => {
    const { PlanningIntention } = require("../../../../../lib/pddl/Blackbox")([
        require("./pddlIntentions/AdjustMorningLightBrightnessfirst_floorIntention.js"),
        require("./pddlIntentions/AdjustAfternoonLightBrightnessfirst_floorIntention.js"),
        require("./pddlIntentions/AdjustEveningLightBrightnessfirst_floorIntention.js"),
        require("./pddlIntentions/AdjustMorningLightTemperaturefirst_floorIntention.js"),
        require("./pddlIntentions/AdjustAfternoonLightTemperaturefirst_floorIntention.js"),
        require("./pddlIntentions/AdjustEveningLightTemperaturefirst_floorIntention.js"),
        require("./pddlIntentions/AdjustMorningLightBrightnessliving_roomIntention.js"),
        require("./pddlIntentions/AdjustAfternoonLightBrightnessliving_roomIntention.js"),
        require("./pddlIntentions/AdjustEveningLightBrightnessliving_roomIntention.js"),
        require("./pddlIntentions/AdjustMorningLightTemperatureliving_roomIntention.js"),
        require("./pddlIntentions/AdjustAfternoonLightTemperatureliving_roomIntention.js"),
        require("./pddlIntentions/AdjustEveningLightTemperatureliving_roomIntention.js"),
        require("./pddlIntentions/AdjustMorningLightBrightnesskitchenIntention.js"),
        require("./pddlIntentions/AdjustAfternoonLightBrightnesskitchenIntention.js"),
        require("./pddlIntentions/AdjustEveningLightBrightnesskitchenIntention.js"),
        require("./pddlIntentions/AdjustMorningLightTemperaturekitchenIntention.js"),
        require("./pddlIntentions/AdjustAfternoonLightTemperaturekitchenIntention.js"),
        require("./pddlIntentions/AdjustEveningLightTemperaturekitchenIntention.js"),
        require("./pddlIntentions/AdjustMorningLightBrightnessbedroomIntention.js"),
        require("./pddlIntentions/AdjustAfternoonLightBrightnessbedroomIntention.js"),
        require("./pddlIntentions/AdjustEveningLightBrightnessbedroomIntention.js"),
        require("./pddlIntentions/AdjustMorningLightTemperaturebedroomIntention.js"),
        require("./pddlIntentions/AdjustAfternoonLightTemperaturebedroomIntention.js"),
        require("./pddlIntentions/AdjustEveningLightTemperaturebedroomIntention.js"),
        require("./pddlIntentions/AdjustMorningLightBrightnessguestroomIntention.js"),
        require("./pddlIntentions/AdjustAfternoonLightBrightnessguestroomIntention.js"),
        require("./pddlIntentions/AdjustEveningLightBrightnessguestroomIntention.js"),
        require("./pddlIntentions/AdjustMorningLightTemperatureguestroomIntention.js"),
        require("./pddlIntentions/AdjustAfternoonLightTemperatureguestroomIntention.js"),
        require("./pddlIntentions/AdjustEveningLightTemperatureguestroomIntention.js"),
        require("./pddlIntentions/AdjustMorningLightBrightnesssecond_floorIntention.js"),
        require("./pddlIntentions/AdjustAfternoonLightBrightnesssecond_floorIntention.js"),
        require("./pddlIntentions/AdjustEveningLightBrightnesssecond_floorIntention.js"),
        require("./pddlIntentions/AdjustMorningLightTemperaturesecond_floorIntention.js"),
        require("./pddlIntentions/AdjustAfternoonLightTemperaturesecond_floorIntention.js"),
        require("./pddlIntentions/AdjustEveningLightTemperaturesecond_floorIntention.js"),
        require("./pddlIntentions/AdjustMorningLightBrightnessbathroomIntention.js"),
        require("./pddlIntentions/AdjustAfternoonLightBrightnessbathroomIntention.js"),
        require("./pddlIntentions/AdjustEveningLightBrightnessbathroomIntention.js"),
        require("./pddlIntentions/AdjustMorningLightTemperaturebathroomIntention.js"),
        require("./pddlIntentions/AdjustAfternoonLightTemperaturebathroomIntention.js"),
        require("./pddlIntentions/AdjustEveningLightTemperaturebathroomIntention.js"),
    ]);
    return [
        AdjustLightOffIntention,
        TurnLightOffIntention,
        TurnLightOnIntention,
        PlanningIntention,
    ];
};

module.exports = { initIntentions };
