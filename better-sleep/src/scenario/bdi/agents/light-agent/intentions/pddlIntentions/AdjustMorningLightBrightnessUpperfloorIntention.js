const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustMorningLightBrightnessUpperfloorIntention extends pddlActionIntention {
    static parameters = [
        "upper_floor-main_light",
        "time",
        "upper_floor",
    ];
    static precondition = [
        ["LIGHT", "upper_floor-main_light"],
        ["DAYTIME", "time"],
        ["MORNING", "time"],
        ["ROOM", "upper_floor"],
        ["UPPER_FLOOR", "upper_floor"],
        ["on", "upper_floor-main_light"],
        ["not morning-brightness", "upper_floor-main_light"],
        ["not free", "upper_floor"],
    ];
    static effect = [
        ["not evening-brightness", "upper_floor-main_light"],
        ["morning-brightness", "upper_floor-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        yield mainLight.setBrightness(200);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustMorningLightBrightnessUpperfloorIntention;
