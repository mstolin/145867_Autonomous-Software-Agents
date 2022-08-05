const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustMorningLightBrightnessBedroomIntention extends pddlActionIntention {
    static parameters = [
        "bedroom-main_light",
        "time",
        "bedroom",
    ];
    static precondition = [
        ["LIGHT", "bedroom-main_light"],
        ["DAYTIME", "time"],
        ["MORNING", "time"],
        ["ROOM", "bedroom"],
        ["BEDROOM", "bedroom"],
        ["on", "bedroom-main_light"],
        ["not morning-brightness", "bedroom-main_light"],
        ["not free", "bedroom"],
    ];
    static effect = [
        ["not evening-brightness", "bedroom-main_light"],
        ["morning-brightness", "bedroom-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        yield mainLight.setBrightness(200);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustMorningLightBrightnessBedroomIntention;
