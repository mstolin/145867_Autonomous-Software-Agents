const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustEveningLightTemperaturekitchenIntention extends pddlActionIntention {
    static parameters = [
        "kitchen-main_light",
        "time",
        "kitchen",
    ];
    static precondition = [
        ["LIGHT", "kitchen-main_light"],
        ["DAYTIME", "time"],
        ["EVENING", "time"],
        ["ROOM", "kitchen"],
        ["KITCHEN", "kitchen"],
        ["on", "kitchen-main_light"],
        ["not evening-temp", "kitchen-main_light"],
        ["not free", "kitchen"],
    ];
    static effect = [
        ["not afternoon-temp", "kitchen-main_light"],
        ["evening-temp", "kitchen-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.rooms["kitchen"].mainLight;
        yield mainLight.setTemperature(1900);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustEveningLightTemperaturekitchenIntention;
