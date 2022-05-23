const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustMorningLightTemperatureIntention extends pddlActionIntention {
    static parameters = ["mainLight", "time", "thisRoom"];
    static precondition = [
        ["LIGHT", "mainLight"],
        ["DAYTIME", "time"],
        ["MORNING", "time"],
        ["ROOM", "thisRoom"],
        ["on", "mainLight"],
        ["not morning-temp", "mainLight"],
        ["not free", "thisRoom"],
    ];
    static effect = [["morning-temp", "mainLight"]];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        try {
            for (let b of this.effect) this.agent.beliefs.apply(b);
            yield mainLight.setTemperature(2000);
        } catch (err) {
            this.log(err);
        }
    }
}

module.exports = AdjustMorningLightTemperatureIntention;
