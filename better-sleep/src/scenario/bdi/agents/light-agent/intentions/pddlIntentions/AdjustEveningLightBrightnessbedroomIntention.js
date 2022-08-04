const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustEveningLightBrightnessbedroomIntention extends pddlActionIntention {
    static parameters = [
        "bedroom-main_light",
        "time",
        "bedroom",
    ];
    static precondition = [
        ["LIGHT", "bedroom-main_light"],
        ["DAYTIME", "time"],
        ["EVENING", "time"],
        ["ROOM", "bedroom"],
        ["BEDROOM", "bedroom"],
        ["on", "bedroom-main_light"],
        ["not evening-brightness", "bedroom-main_light"],
        ["not free", "bedroom"],
    ];
    static effect = [
        ["not afternoon-brightness", "bedroom-main_light"],
        ["evening-brightness", "bedroom-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.rooms["bedroom"].mainLight;
        yield mainLight.setBrightness(300);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustEveningLightBrightnessbedroomIntention;
