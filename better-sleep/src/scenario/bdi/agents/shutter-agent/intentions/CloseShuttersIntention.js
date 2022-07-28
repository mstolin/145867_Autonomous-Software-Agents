const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class CloseShuttersIntention extends pddlActionIntention {
    static parameters = ["shutters"];
    static precondition = [
        ["SHUTTER", "shutters"],
        ["on", "shutters"],
        ["not closed", "shutters"],
    ];
    static effect = [
        ["closed", "shutters"],
        ["not openFull", "shutters"],
        ["not openHalf", "shutters"],
    ];

    #closeShutters() {
        this.agent.room.shutters.forEach((shutter) => {
            shutter.close();
        });
    }

    *exec() {
        try {
            this.#closeShutters();
            for (let b of this.effect) this.agent.beliefs.apply(b);
        } catch (err) {
            this.log(err);
        }
    }
}

module.exports = CloseShuttersIntention;
