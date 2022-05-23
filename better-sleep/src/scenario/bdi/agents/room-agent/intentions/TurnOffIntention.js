const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class TurnOffIntention extends pddlActionIntention {
    static parameters = ["mainLight", "thisRoom"];
    static precondition = [
        ["LIGHT", "mainLight"],
        ["ROOM", "thisRoom"],
        ["on", "mainLight"],
        ["free", "thisRoom"],
    ];
    static effect = [["not on", "mainLight"]];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        try {
            for (let b of this.effect) this.agent.beliefs.apply(b);
            yield mainLight.turnOff();
        } catch (err) {
            this.log(err);
        }
    }
}

module.exports = TurnOffIntention;
