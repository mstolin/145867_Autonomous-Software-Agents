const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustAfternoonLightTemperaturekitchenIntention extends pddlActionIntention {
    static parameters = [
        "kitchen-main_light",
        "time",
        "kitchen",
    ];
    static precondition = [
        ["LIGHT", "kitchen-main_light"],
        ["DAYTIME", "time"],
        ["AFTERNOON", "time"],
        ["ROOM", "kitchen"],
        ["KITCHEN", "kitchen"],
        ["on", "kitchen-main_light"],
        ["not afternoon-temp", "kitchen-main_light"],
        ["not free", "kitchen"],
    ];
    static effect = [
        ["not morning-temp", "kitchen-main_light"],
        ["afternoon-temp", "kitchen-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.rooms["kitchen"].mainLight;
        yield mainLight.setTemperature(4000);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustAfternoonLightTemperaturekitchenIntention;
