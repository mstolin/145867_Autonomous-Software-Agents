const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustAfternoonLightBrightnessIntention extends pddlActionIntention {
    static parameters = ["mainLight", "time", "thisRoom"];
    static precondition = [
        ["LIGHT", "mainLight"],
        ["DAYTIME", "time"],
        ["AFTERNOON", "time"],
        ["ROOM", "thisRoom"],
        ["on", "mainLight"],
        ["not afternoon-brightness", "mainLight"],
        ["not free", "thisRoom"],
    ];
    static effect = [["afternoon-brightness", "mainLight"]];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        try {
            
            yield mainLight.setBrightness(500); // TODO A meaningful value
            for (let b of this.effect) this.agent.beliefs.apply(b);
        } catch (err) {
            this.log(err);
        }
    }
}

module.exports = AdjustAfternoonLightBrightnessIntention;
