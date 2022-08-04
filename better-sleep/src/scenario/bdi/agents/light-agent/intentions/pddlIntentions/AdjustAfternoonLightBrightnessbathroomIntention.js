const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustAfternoonLightBrightnessbathroomIntention extends pddlActionIntention {
    static parameters = [
        "bathroom-main_light",
        "time",
        "bathroom",
    ];
    static precondition = [
        ["LIGHT", "bathroom-main_light"],
        ["DAYTIME", "time"],
        ["AFTERNOON", "time"],
        ["ROOM", "bathroom"],
        ["BATHROOM", "bathroom"],
        ["on", "bathroom-main_light"],
        ["not afternoon-brightness", "bathroom-main_light"],
        ["not free", "bathroom"],
    ];
    static effect = [
        ["not morning-brightness", "bathroom-main_light"],
        ["afternoon-brightness", "bathroom-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.rooms["bathroom"].mainLight;
        yield mainLight.setBrightness(500);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustAfternoonLightBrightnessbathroomIntention;
