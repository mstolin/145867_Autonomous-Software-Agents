const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class OpenShuttersHalfwayIntention extends pddlActionIntention {
    static parameters = ["shutters"];
    static precondition = [
        ["SHUTTER", "shutters"],
        ["on", "shutters"],
        ["not openHalf", "shutters"],
    ];
    static effect = [
        ["openHalf", "shutters"],
        ["not openFull", "shutters"],
        ["not closed", "shutters"],
    ];

    #openShuttersHalf() {
        this.agent.room.shutters.forEach((shutter) => {
            shutter.halfwayOpen();
        });
    }

    *exec() {
        try {
            this.#openShuttersHalf();
            for (let b of this.effect) this.agent.beliefs.apply(b);
        } catch (err) {
            this.log(err);
        }
    }
}

module.exports = OpenShuttersHalfwayIntention;
