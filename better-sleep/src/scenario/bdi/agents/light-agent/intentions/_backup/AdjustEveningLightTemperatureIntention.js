const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustEveningLightTemperatureIntention extends pddlActionIntention {
    static parameters = ["mainLight", "time", "thisRoom"];
    static precondition = [
        ["LIGHT", "mainLight"],
        ["DAYTIME", "time"],
        ["EVENING", "time"],
        ["ROOM", "thisRoom"],
        ["on", "mainLight"],
        ["not evening-temp", "mainLight"],
        ["not free", "thisRoom"],
    ];
    static effect = [
        ["not afternoon-temp", "mainLight"],
        ["evening-temp", "mainLight"],
    ];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        try {
            yield mainLight.setTemperature(1900);
            for (let b of this.effect) this.agent.beliefs.apply(b);
        } catch (err) {
            this.log(err);
        }
    }
}

module.exports = AdjustEveningLightTemperatureIntention;
