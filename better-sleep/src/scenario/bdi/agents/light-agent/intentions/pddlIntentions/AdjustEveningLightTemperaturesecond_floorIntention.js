const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustEveningLightTemperaturesecond_floorIntention extends pddlActionIntention {
    static parameters = [
        "second_floor-main_light",
        "time",
        "second_floor",
    ];
    static precondition = [
        ["LIGHT", "second_floor-main_light"],
        ["DAYTIME", "time"],
        ["EVENING", "time"],
        ["ROOM", "second_floor"],
        ["SECOND_FLOOR", "second_floor"],
        ["on", "second_floor-main_light"],
        ["not evening-temp", "second_floor-main_light"],
        ["not free", "second_floor"],
    ];
    static effect = [
        ["not afternoon-temp", "second_floor-main_light"],
        ["evening-temp", "second_floor-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.rooms["second_floor"].mainLight;
        yield mainLight.setTemperature(1900);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustEveningLightTemperaturesecond_floorIntention;
