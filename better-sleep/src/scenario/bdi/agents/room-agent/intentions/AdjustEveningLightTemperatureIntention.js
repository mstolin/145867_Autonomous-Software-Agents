const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustEveningLightTemperatureIntention extends pddlActionIntention {
    static parameters = ["mainLight", "time"];
    static precondition = [
        ["LIGHT", "mainLight"],
        ["DAYTIME", "time"],
        ["EVENING", "time"],
        ["ROOM", "thisRoom"],
        ["on", "mainLight"],
        ["not evening-temp", "mainLight"],
        ["not free", "thisRoom"],
    ];
    static effect = [["evening-temp", "mainLight"]];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        try {
            for (let b of this.effect) this.agent.beliefs.apply(b);
            yield mainLight.setTemperature(1900);
        } catch (err) {
            this.log(err);
        }
    }
}

module.exports = AdjustEveningLightTemperatureIntention;
