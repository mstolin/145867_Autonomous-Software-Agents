const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustMorningLightTemperaturesecond_floorIntention extends pddlActionIntention {
    static parameters = [
        "second_floor-main_light",
        "time",
        "second_floor",
    ];
    static precondition = [
        ["LIGHT", "second_floor-main_light"],
        ["DAYTIME", "time"],
        ["MORNING", "time"],
        ["ROOM", "second_floor"],
        ["SECOND_FLOOR", "second_floor"],
        ["on", "second_floor-main_light"],
        ["not morning-temp", "second_floor-main_light"],
        ["not free", "second_floor"],
    ];
    static effect = [
        ["not evening-temp", "second_floor-main_light"],
        ["morning-temp", "second_floor-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.rooms["second_floor"].mainLight;
        yield mainLight.setTemperature(2000);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustMorningLightTemperaturesecond_floorIntention;
