const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustMorningLightBrightnessIntention extends pddlActionIntention {
    static parameters = ["mainLight", "time", "thisRoom"];
    static precondition = [
        ["LIGHT", "mainLight"],
        ["DAYTIME", "time"],
        ["MORNING", "time"],
        ["ROOM", "thisRoom"],
        ["on", "mainLight"],
        ["not morning-brightness", "mainLight"],
        ["not free", "thisRoom"],
    ];
    static effect = [["morning-brightness", "mainLight"]];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        try {
            
            yield mainLight.setBrightness(200); // TODO A meaningful value
            for (let b of this.effect) this.agent.beliefs.apply(b);
        } catch (err) {
            this.log(err);
        }
    }
}

module.exports = AdjustMorningLightBrightnessIntention;
