const TurnLightOnIntention = require("./TurnLightOnIntention");
const TurnLightOffIntention = require("./TurnLightOffIntention");
const AdjustLightOffIntention = require("./AdjustLightOffIntention");
const GenericAdjustIntentionFactory = require("./GenericAdjustLightIntention");

function genGenericAdjustIntentions(house) {
    let planningIntentions = [];
    for (room of Object.values(house.rooms)) {
        let AdjustMorningLightTempIntention =
            GenericAdjustIntentionFactory.genAdjustMorningTempIntention(
                room,
                (_) => room.mainLight.setTemperature(2000)
            );
        let AdjustAfternoonLightTempIntention =
            GenericAdjustIntentionFactory.genAdjustAfternoonTempIntention(
                room,
                (_) => room.mainLight.setTemperature(4000)
            );
        let AdjustEveningLightTempIntention =
            GenericAdjustIntentionFactory.genAdjustEveningTempIntention(
                room,
                (_) => room.mainLight.setTemperature(1900)
            );
        let AdjustMorningBrightnessIntention =
            GenericAdjustIntentionFactory.genAdjustMorningBrightnessIntention(
                room,
                (_) => room.mainLight.setBrightness(200)
            );
        let AdjustAfternoonBrightnessIntention =
            GenericAdjustIntentionFactory.genAdjustMorningBrightnessIntention(
                room,
                (_) => room.mainLight.setBrightness(500)
            );
        let AdjustEveningBrightnessIntention =
            GenericAdjustIntentionFactory.genAdjustMorningBrightnessIntention(
                room,
                (_) => room.mainLight.setBrightness(300)
            );
        planningIntentions.push(
            AdjustMorningLightTempIntention,
            AdjustAfternoonLightTempIntention,
            AdjustEveningLightTempIntention,
            AdjustMorningBrightnessIntention,
            AdjustAfternoonBrightnessIntention,
            AdjustEveningBrightnessIntention
        );
    }
    let { PlanningIntention } = require("../../../../../lib/pddl/Blackbox")([
        ...planningIntentions,
    ]);
    return PlanningIntention;
}

const initIntentions = (house) => {
    let planningIntention = genGenericAdjustIntentions(house);
    return [
        AdjustLightOffIntention,
        TurnLightOffIntention,
        TurnLightOnIntention,
        planningIntention,
    ];
};

module.exports = { initIntentions };
