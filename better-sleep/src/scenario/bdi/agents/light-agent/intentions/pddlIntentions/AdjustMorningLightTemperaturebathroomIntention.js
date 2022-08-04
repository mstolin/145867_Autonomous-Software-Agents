const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustMorningLightTemperaturebathroomIntention extends pddlActionIntention {
    static parameters = [
        "bathroom-main_light",
        "time",
        "bathroom",
    ];
    static precondition = [
        ["LIGHT", "bathroom-main_light"],
        ["DAYTIME", "time"],
        ["MORNING", "time"],
        ["ROOM", "bathroom"],
        ["BATHROOM", "bathroom"],
        ["on", "bathroom-main_light"],
        ["not morning-temp", "bathroom-main_light"],
        ["not free", "bathroom"],
    ];
    static effect = [
        ["not evening-temp", "bathroom-main_light"],
        ["morning-temp", "bathroom-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.rooms["bathroom"].mainLight;
        yield mainLight.setTemperature(2000);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustMorningLightTemperaturebathroomIntention;
