const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustEveningLightTemperatureBedroomIntention extends pddlActionIntention {
    static parameters = [
        "bedroom-main_light",
        "time",
        "bedroom",
    ];
    static precondition = [
        ["LIGHT", "bedroom-main_light"],
        ["DAYTIME", "time"],
        ["EVENING", "time"],
        ["ROOM", "bedroom"],
        ["BEDROOM", "bedroom"],
        ["on", "bedroom-main_light"],
        ["not evening-temp", "bedroom-main_light"],
        ["not free", "bedroom"],
    ];
    static effect = [
        ["not afternoon-temp", "bedroom-main_light"],
        ["evening-temp", "bedroom-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        yield mainLight.setTemperature(1900);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustEveningLightTemperatureBedroomIntention;
