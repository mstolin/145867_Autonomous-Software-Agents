const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class TurnOnIntention extends pddlActionIntention {
    static parameters = ["mainLight", "thisRoom"];
    static precondition = [
        ["LIGHT", "mainLight"],
        ["ROOM", "thisRoom"],
        ["not on", "mainLight"],
        ["not free", "thisRoom"],
    ];
    static effect = [["on", "mainLight"]];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        try {
            yield mainLight.turnOn();
            for (let b of this.effect) this.agent.beliefs.apply(b);
        } catch (err) {
            this.log(err);
        }
    }
}

module.exports = TurnOnIntention;
