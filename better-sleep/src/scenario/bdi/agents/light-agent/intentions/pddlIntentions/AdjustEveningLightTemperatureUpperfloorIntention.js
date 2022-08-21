const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustEveningLightTemperatureUpperfloorIntention extends pddlActionIntention {
    static parameters = [
        "upper_floor-main_light",
        "time",
        "upper_floor",
    ];
    static precondition = [
        ["LIGHT", "upper_floor-main_light"],
        ["DAYTIME", "time"],
        ["EVENING", "time"],
        ["ROOM", "upper_floor"],
        ["UPPER_FLOOR", "upper_floor"],
        ["on", "upper_floor-main_light"],
        ["not evening-temp", "upper_floor-main_light"],
        ["not free", "upper_floor"],
    ];
    static effect = [
        ["not afternoon-temp", "upper_floor-main_light"],
        ["evening-temp", "upper_floor-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        yield mainLight.setTemperature(1900);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustEveningLightTemperatureUpperfloorIntention;
