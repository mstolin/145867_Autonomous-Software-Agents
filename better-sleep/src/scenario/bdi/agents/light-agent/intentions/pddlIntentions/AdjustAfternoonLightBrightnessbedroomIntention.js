const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustAfternoonLightBrightnessbedroomIntention extends pddlActionIntention {
    static parameters = [
        "bedroom-main_light",
        "time",
        "bedroom",
    ];
    static precondition = [
        ["LIGHT", "bedroom-main_light"],
        ["DAYTIME", "time"],
        ["AFTERNOON", "time"],
        ["ROOM", "bedroom"],
        ["BEDROOM", "bedroom"],
        ["on", "bedroom-main_light"],
        ["not afternoon-brightness", "bedroom-main_light"],
        ["not free", "bedroom"],
    ];
    static effect = [
        ["not morning-brightness", "bedroom-main_light"],
        ["afternoon-brightness", "bedroom-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.rooms["bedroom"].mainLight;
        yield mainLight.setBrightness(500);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustAfternoonLightBrightnessbedroomIntention;
