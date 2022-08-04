const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustEveningLightBrightnessfirst_floorIntention extends pddlActionIntention {
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
        ["not evening-brightness", "first_floor-main_light"],
        ["not free", "first_floor"],
    ];
    static effect = [
        ["not afternoon-brightness", "first_floor-main_light"],
        ["evening-brightness", "first_floor-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.rooms["first_floor"].mainLight;
        yield mainLight.setBrightness(300);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustEveningLightBrightnessfirst_floorIntention;
