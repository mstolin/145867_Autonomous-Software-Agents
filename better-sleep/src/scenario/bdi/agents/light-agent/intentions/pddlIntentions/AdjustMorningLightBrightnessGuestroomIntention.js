const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustMorningLightBrightnessGuestroomIntention extends pddlActionIntention {
    static parameters = [
        "guestroom-main_light",
        "time",
        "guestroom",
    ];
    static precondition = [
        ["LIGHT", "guestroom-main_light"],
        ["DAYTIME", "time"],
        ["MORNING", "time"],
        ["ROOM", "guestroom"],
        ["GUESTROOM", "guestroom"],
        ["on", "guestroom-main_light"],
        ["not morning-brightness", "guestroom-main_light"],
        ["not free", "guestroom"],
    ];
    static effect = [
        ["not evening-brightness", "guestroom-main_light"],
        ["morning-brightness", "guestroom-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        yield mainLight.setBrightness(200);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustMorningLightBrightnessGuestroomIntention;
