const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class TurnOnIntention extends pddlActionIntention {
    static parameters = ["mainLight"];
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
            for (let b of this.effect) this.agent.beliefs.apply(b);
            yield mainLight.turnOn();
        } catch (err) {
            this.log(err);
        }
    }
}

module.exports = TurnOnIntention;
