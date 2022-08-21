const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustAfternoonLightBrightnessUpperfloorIntention extends pddlActionIntention {
    static parameters = [
        "upper_floor-main_light",
        "time",
        "upper_floor",
    ];
    static precondition = [
        ["LIGHT", "upper_floor-main_light"],
        ["DAYTIME", "time"],
        ["AFTERNOON", "time"],
        ["ROOM", "upper_floor"],
        ["UPPER_FLOOR", "upper_floor"],
        ["on", "upper_floor-main_light"],
        ["not afternoon-brightness", "upper_floor-main_light"],
        ["not free", "upper_floor"],
    ];
    static effect = [
        ["not morning-brightness", "upper_floor-main_light"],
        ["afternoon-brightness", "upper_floor-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        yield mainLight.setBrightness(500);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustAfternoonLightBrightnessUpperfloorIntention;
