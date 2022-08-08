const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

/**
 * This intentions halfway opens the shutters of the room.
 * @class
 */
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

    /**
     * Opens all shutters of the room halfway.
     */
    #openShuttersHalf() {
        this.agent.room.shutters.forEach((shutter) => {
            shutter.halfwayOpen();
        });
    }

    *exec() {
        this.#openShuttersHalf();
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = OpenShuttersHalfwayIntention;
