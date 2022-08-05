const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustEveningLightBrightnessBathroomIntention extends pddlActionIntention {
    static parameters = [
        "bathroom-main_light",
        "time",
        "bathroom",
    ];
    static precondition = [
        ["LIGHT", "bathroom-main_light"],
        ["DAYTIME", "time"],
        ["EVENING", "time"],
        ["ROOM", "bathroom"],
        ["BATHROOM", "bathroom"],
        ["on", "bathroom-main_light"],
        ["not evening-brightness", "bathroom-main_light"],
        ["not free", "bathroom"],
    ];
    static effect = [
        ["not afternoon-brightness", "bathroom-main_light"],
        ["evening-brightness", "bathroom-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        yield mainLight.setBrightness(300);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustEveningLightBrightnessBathroomIntention;
