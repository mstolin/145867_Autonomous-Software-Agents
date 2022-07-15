const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class OpenAllShuttersHalfwayIntention extends pddlActionIntention {
    static parameters = ["time", "shutters"];
    static precondition = [
        ["DAYTIME", "time"],
        ["MORNING", "time"],
        ["SHUTTER", "shutters"],
        ["on", "shutters"],
        ["not openHalf", "shutters"],
    ];
    static effect = [
        ["openHalf", "shutters"],
        ["not openFull", "shutters"],
    ];

    #openAllShuttersHalfway() {
        this.agent.room.shutters.forEach((shutter) => {
            try {
                shutter.halfwayOpen();
            } catch (err) {
                this.log(err);
            }
        });
    }

    *exec() {
        while (true) {
            yield;
            this.#openAllShuttersHalfway();
            for (let b of this.effect) this.agent.beliefs.apply(b);
            break;
        }
    }
}

module.exports = OpenAllShuttersHalfwayIntention;
