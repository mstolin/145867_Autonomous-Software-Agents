const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class TurnOffIntention extends pddlActionIntention {
    static parameters = ["mainLight", "thisRoom"];
    static precondition = [
        ["LIGHT", "mainLight"],
        ["ROOM", "thisRoom"],
        ["on", "mainLight"],
        ["free", "thisRoom"],
    ];
    static effect = [
        ["not on", "mainLight"],
        ["not morning-brightness", "mainLight"],
        ["not morning-temp", "mainLight"],
        ["not afternoon-brightness", "mainLight"],
        ["not afternoon-temp", "mainLight"],
        ["not evening-brightness", "mainLight"],
        ["not evening-temp", "mainLight"],
    ];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        try {
            yield mainLight.turnOff();
            for (let b of this.effect) this.agent.beliefs.apply(b);
        } catch (err) {
            this.log(err);
        }
    }
}

module.exports = TurnOffIntention;
