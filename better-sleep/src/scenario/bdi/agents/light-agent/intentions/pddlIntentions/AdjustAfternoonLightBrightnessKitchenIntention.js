const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustAfternoonLightBrightnessKitchenIntention extends pddlActionIntention {
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
        ["not afternoon-brightness", "kitchen-main_light"],
        ["not free", "kitchen"],
    ];
    static effect = [
        ["not morning-brightness", "kitchen-main_light"],
        ["afternoon-brightness", "kitchen-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        yield mainLight.setBrightness(500);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustAfternoonLightBrightnessKitchenIntention;
