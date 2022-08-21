const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustEveningLightTemperatureLowerfloorIntention extends pddlActionIntention {
    static parameters = [
        "lower_floor-main_light",
        "time",
        "lower_floor",
    ];
    static precondition = [
        ["LIGHT", "lower_floor-main_light"],
        ["DAYTIME", "time"],
        ["EVENING", "time"],
        ["ROOM", "lower_floor"],
        ["LOWER_FLOOR", "lower_floor"],
        ["on", "lower_floor-main_light"],
        ["not evening-temp", "lower_floor-main_light"],
        ["not free", "lower_floor"],
    ];
    static effect = [
        ["not afternoon-temp", "lower_floor-main_light"],
        ["evening-temp", "lower_floor-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        yield mainLight.setTemperature(1900);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustEveningLightTemperatureLowerfloorIntention;
