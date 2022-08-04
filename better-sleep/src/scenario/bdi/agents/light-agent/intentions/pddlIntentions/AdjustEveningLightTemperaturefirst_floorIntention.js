const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustEveningLightTemperaturefirst_floorIntention extends pddlActionIntention {
    static parameters = [
        "first_floor-main_light",
        "time",
        "first_floor",
    ];
    static precondition = [
        ["LIGHT", "first_floor-main_light"],
        ["DAYTIME", "time"],
        ["EVENING", "time"],
        ["ROOM", "first_floor"],
        ["FIRST_FLOOR", "first_floor"],
        ["on", "first_floor-main_light"],
        ["not evening-temp", "first_floor-main_light"],
        ["not free", "first_floor"],
    ];
    static effect = [
        ["not afternoon-temp", "first_floor-main_light"],
        ["evening-temp", "first_floor-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.rooms["first_floor"].mainLight;
        yield mainLight.setTemperature(1900);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustEveningLightTemperaturefirst_floorIntention;
