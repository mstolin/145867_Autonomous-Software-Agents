const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustMorningLightTemperaturekitchenIntention extends pddlActionIntention {
    static parameters = [
        "kitchen-main_light",
        "time",
        "kitchen",
    ];
    static precondition = [
        ["LIGHT", "kitchen-main_light"],
        ["DAYTIME", "time"],
        ["MORNING", "time"],
        ["ROOM", "kitchen"],
        ["KITCHEN", "kitchen"],
        ["on", "kitchen-main_light"],
        ["not morning-temp", "kitchen-main_light"],
        ["not free", "kitchen"],
    ];
    static effect = [
        ["not evening-temp", "kitchen-main_light"],
        ["morning-temp", "kitchen-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.rooms["kitchen"].mainLight;
        yield mainLight.setTemperature(2000);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustMorningLightTemperaturekitchenIntention;
