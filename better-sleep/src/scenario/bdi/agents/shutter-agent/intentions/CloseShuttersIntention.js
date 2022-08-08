const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

/**
 * This intention will close all shutters of
 * a room.
 * @class
 */
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

    /**
     * Closes all shutters of the room.
     */
    #closeShutters() {
        this.agent.room.shutters.forEach((shutter) => {
            shutter.close();
        });
    }

    *exec() {
        this.#closeShutters();
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = CloseShuttersIntention;
