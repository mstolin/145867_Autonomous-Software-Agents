const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustMorningLightTemperatureFirstfloorIntention extends pddlActionIntention {
    static parameters = [
        "first_floor-main_light",
        "time",
        "first_floor",
    ];
    static precondition = [
        ["LIGHT", "first_floor-main_light"],
        ["DAYTIME", "time"],
        ["MORNING", "time"],
        ["ROOM", "first_floor"],
        ["FIRST_FLOOR", "first_floor"],
        ["on", "first_floor-main_light"],
        ["not morning-temp", "first_floor-main_light"],
        ["not free", "first_floor"],
    ];
    static effect = [
        ["not evening-temp", "first_floor-main_light"],
        ["morning-temp", "first_floor-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        yield mainLight.setTemperature(2000);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustMorningLightTemperatureFirstfloorIntention;
