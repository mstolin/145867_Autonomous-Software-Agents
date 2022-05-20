const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class TurnOn extends pddlActionIntention {
    static parameters = ["light"];
    static precondition = [
        ["LIGHT", "light"],
        ["not on", "light"],
    ];
    static effect = [["on", "light"]];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        try {
            for (let b of this.effect) this.agent.beliefs.apply(b);
            yield mainLight.turnOn();
        } catch (err) {
            this.log(err);
        }

        //yield new Promise((res) => setTimeout(res, 100));
    }
}

module.exports = TurnOn;
