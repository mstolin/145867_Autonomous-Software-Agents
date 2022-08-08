const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

/**
 * This intention fully opens all shutters of the room.
 * @class
 */
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

    /**
     * This will open all shutters of the room.
     */
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
