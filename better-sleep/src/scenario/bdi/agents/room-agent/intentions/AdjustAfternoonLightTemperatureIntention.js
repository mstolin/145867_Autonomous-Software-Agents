const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustAfternoonLightTemperatureIntention extends pddlActionIntention {
    static parameters = ["mainLight", "time", "thisRoom"];
    static precondition = [
        ["LIGHT", "mainLight"],
        ["DAYTIME", "time"],
        ["AFTERNOON", "time"],
        ["ROOM", "thisRoom"],
        ["on", "mainLight"],
        ["not afternoon-temp", "mainLight"],
        ["not free", "thisRoom"],
    ];
    static effect = [["afternoon-temp", "mainLight"]];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        try {
            for (let b of this.effect) this.agent.beliefs.apply(b);
            yield mainLight.setTemperature(4000);
        } catch (err) {
            this.log(err);
        }
    }
}

module.exports = AdjustAfternoonLightTemperatureIntention;
