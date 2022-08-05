const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustAfternoonLightTemperatureBedroomIntention extends pddlActionIntention {
    static parameters = [
        "bedroom-main_light",
        "time",
        "bedroom",
    ];
    static precondition = [
        ["LIGHT", "bedroom-main_light"],
        ["DAYTIME", "time"],
        ["AFTERNOON", "time"],
        ["ROOM", "bedroom"],
        ["BEDROOM", "bedroom"],
        ["on", "bedroom-main_light"],
        ["not afternoon-temp", "bedroom-main_light"],
        ["not free", "bedroom"],
    ];
    static effect = [
        ["not morning-temp", "bedroom-main_light"],
        ["afternoon-temp", "bedroom-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        yield mainLight.setTemperature(4000);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustAfternoonLightTemperatureBedroomIntention;
