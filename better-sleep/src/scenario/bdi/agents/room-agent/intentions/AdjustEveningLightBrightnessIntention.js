const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustEveningLightBrightnessIntention extends pddlActionIntention {
    static parameters = ["mainLight", "time", "thisRoom"];
    static precondition = [
        ["LIGHT", "mainLight"],
        ["DAYTIME", "time"],
        ["EVENING", "time"],
        ["ROOM", "thisRoom"],
        ["on", "mainLight"],
        ["not evening-brightness", "mainLight"],
        ["not free", "thisRoom"],
    ];
    static effect = [
        ["not afternoon-brightness", "mainLight"],
        ["evening-brightness", "mainLight"],
    ];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        try {
            yield mainLight.setBrightness(300); // TODO A meaningful value
            for (let b of this.effect) this.agent.beliefs.apply(b);
        } catch (err) {
            this.log(err);
        }
    }
}

module.exports = AdjustEveningLightBrightnessIntention;
