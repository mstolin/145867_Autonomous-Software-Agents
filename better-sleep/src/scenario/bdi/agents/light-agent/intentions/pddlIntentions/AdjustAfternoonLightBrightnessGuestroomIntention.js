const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustAfternoonLightBrightnessGuestroomIntention extends pddlActionIntention {
    static parameters = [
        "guestroom-main_light",
        "time",
        "guestroom",
    ];
    static precondition = [
        ["LIGHT", "guestroom-main_light"],
        ["DAYTIME", "time"],
        ["AFTERNOON", "time"],
        ["ROOM", "guestroom"],
        ["GUESTROOM", "guestroom"],
        ["on", "guestroom-main_light"],
        ["not afternoon-brightness", "guestroom-main_light"],
        ["not free", "guestroom"],
    ];
    static effect = [
        ["not morning-brightness", "guestroom-main_light"],
        ["afternoon-brightness", "guestroom-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        yield mainLight.setBrightness(500);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustAfternoonLightBrightnessGuestroomIntention;
