const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustEveningLightTemperatureguestroomIntention extends pddlActionIntention {
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
        ["not evening-temp", "guestroom-main_light"],
        ["not free", "guestroom"],
    ];
    static effect = [
        ["not afternoon-temp", "guestroom-main_light"],
        ["evening-temp", "guestroom-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.rooms["guestroom"].mainLight;
        yield mainLight.setTemperature(1900);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustEveningLightTemperatureguestroomIntention;
