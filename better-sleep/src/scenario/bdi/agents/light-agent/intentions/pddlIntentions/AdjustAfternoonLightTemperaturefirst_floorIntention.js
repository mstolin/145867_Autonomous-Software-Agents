const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustAfternoonLightTemperaturefirst_floorIntention extends pddlActionIntention {
    static parameters = [
        "first_floor-main_light",
        "time",
        "first_floor",
    ];
    static precondition = [
        ["LIGHT", "first_floor-main_light"],
        ["DAYTIME", "time"],
        ["AFTERNOON", "time"],
        ["ROOM", "first_floor"],
        ["FIRST_FLOOR", "first_floor"],
        ["on", "first_floor-main_light"],
        ["not afternoon-temp", "first_floor-main_light"],
        ["not free", "first_floor"],
    ];
    static effect = [
        ["not morning-temp", "first_floor-main_light"],
        ["afternoon-temp", "first_floor-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.rooms["first_floor"].mainLight;
        yield mainLight.setTemperature(4000);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustAfternoonLightTemperaturefirst_floorIntention;
