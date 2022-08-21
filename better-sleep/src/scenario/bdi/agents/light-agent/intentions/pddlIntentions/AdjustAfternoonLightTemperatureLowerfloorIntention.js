const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustAfternoonLightTemperatureLowerfloorIntention extends pddlActionIntention {
    static parameters = [
        "lower_floor-main_light",
        "time",
        "lower_floor",
    ];
    static precondition = [
        ["LIGHT", "lower_floor-main_light"],
        ["DAYTIME", "time"],
        ["AFTERNOON", "time"],
        ["ROOM", "lower_floor"],
        ["LOWER_FLOOR", "lower_floor"],
        ["on", "lower_floor-main_light"],
        ["not afternoon-temp", "lower_floor-main_light"],
        ["not free", "lower_floor"],
    ];
    static effect = [
        ["not morning-temp", "lower_floor-main_light"],
        ["afternoon-temp", "lower_floor-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        yield mainLight.setTemperature(4000);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustAfternoonLightTemperatureLowerfloorIntention;
