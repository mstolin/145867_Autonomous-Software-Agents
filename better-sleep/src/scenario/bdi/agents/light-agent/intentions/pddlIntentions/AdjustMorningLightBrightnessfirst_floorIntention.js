const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustMorningLightBrightnessfirst_floorIntention extends pddlActionIntention {
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
        ["not morning-brightness", "first_floor-main_light"],
        ["not free", "first_floor"],
    ];
    static effect = [
        ["not evening-brightness", "first_floor-main_light"],
        ["morning-brightness", "first_floor-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.rooms["first_floor"].mainLight;
        yield mainLight.setBrightness(200);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustMorningLightBrightnessfirst_floorIntention;
