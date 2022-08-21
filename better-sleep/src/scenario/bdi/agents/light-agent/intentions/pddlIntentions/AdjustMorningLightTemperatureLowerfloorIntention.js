const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustMorningLightTemperatureLowerfloorIntention extends pddlActionIntention {
    static parameters = [
        "lower_floor-main_light",
        "time",
        "lower_floor",
    ];
    static precondition = [
        ["LIGHT", "lower_floor-main_light"],
        ["DAYTIME", "time"],
        ["MORNING", "time"],
        ["ROOM", "lower_floor"],
        ["LOWER_FLOOR", "lower_floor"],
        ["on", "lower_floor-main_light"],
        ["not morning-temp", "lower_floor-main_light"],
        ["not free", "lower_floor"],
    ];
    static effect = [
        ["not evening-temp", "lower_floor-main_light"],
        ["morning-temp", "lower_floor-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        yield mainLight.setTemperature(2000);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustMorningLightTemperatureLowerfloorIntention;
