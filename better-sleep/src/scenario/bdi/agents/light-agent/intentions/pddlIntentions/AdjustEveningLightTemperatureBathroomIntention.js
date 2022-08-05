const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustEveningLightTemperatureBathroomIntention extends pddlActionIntention {
    static parameters = [
        "bathroom-main_light",
        "time",
        "bathroom",
    ];
    static precondition = [
        ["LIGHT", "bathroom-main_light"],
        ["DAYTIME", "time"],
        ["EVENING", "time"],
        ["ROOM", "bathroom"],
        ["BATHROOM", "bathroom"],
        ["on", "bathroom-main_light"],
        ["not evening-temp", "bathroom-main_light"],
        ["not free", "bathroom"],
    ];
    static effect = [
        ["not afternoon-temp", "bathroom-main_light"],
        ["evening-temp", "bathroom-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        yield mainLight.setTemperature(1900);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustEveningLightTemperatureBathroomIntention;
