const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustEveningLightBrightnessGuestroomIntention extends pddlActionIntention {
    static parameters = [
        "guestroom-main_light",
        "time",
        "guestroom",
    ];
    static precondition = [
        ["LIGHT", "guestroom-main_light"],
        ["DAYTIME", "time"],
        ["EVENING", "time"],
        ["ROOM", "guestroom"],
        ["GUESTROOM", "guestroom"],
        ["on", "guestroom-main_light"],
        ["not evening-brightness", "guestroom-main_light"],
        ["not free", "guestroom"],
    ];
    static effect = [
        ["not afternoon-brightness", "guestroom-main_light"],
        ["evening-brightness", "guestroom-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        yield mainLight.setBrightness(300);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustEveningLightBrightnessGuestroomIntention;
