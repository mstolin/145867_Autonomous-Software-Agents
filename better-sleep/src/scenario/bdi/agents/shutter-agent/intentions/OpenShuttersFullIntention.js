const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class OpenShuttersFullIntention extends pddlActionIntention {
    static parameters = ["shutters"];
    static precondition = [
        ["SHUTTER", "shutters"],
        ["on", "shutters"],
        ["not openFull", "shutters"],
    ];
    static effect = [
        ["openFull", "shutters"],
        ["not openHalf", "shutters"],
        ["not closed", "shutters"],
    ];

    #openShutters() {
        this.agent.room.shutters.forEach((shutter) => {
            shutter.open();
        });
    }

    *exec() {
        this.#openShutters();
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = OpenShuttersFullIntention;
