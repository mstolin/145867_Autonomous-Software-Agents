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
    static effect = [
        ["not evening-temp", "mainLight"],
        ["morning-temp", "mainLight"],
    ];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        try {
            yield mainLight.setTemperature(2000);
            for (let b of this.effect) this.agent.beliefs.apply(b);
        } catch (err) {
            this.log(err);
        }
    }
}

module.exports = AdjustMorningLightTemperatureIntention;
