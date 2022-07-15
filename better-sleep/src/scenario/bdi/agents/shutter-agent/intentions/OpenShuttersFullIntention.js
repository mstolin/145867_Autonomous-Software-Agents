const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class OpenShuttersFullIntention extends pddlActionIntention {
    static parameters = ["time", "shutters"];
    static precondition = [
        ["DAYTIME", "time"],
        ["MORNING", "time"],
        ["SHUTTER", "shutters"],
        ["on", "shutters"],
        ["not openFull", "shutters"],
    ];
    static effect = [
        ["openFull", "shutters"],
        ["not openHalf", "shutters"],
    ];

    #openAllShutters() {
        this.agent.room.shutters.forEach((shutter) => {
            try {
                shutter.open();
            } catch (err) {
                this.log(err);
            }
        });
    }

    *exec() {
        while (true) {
            yield;
            this.#openAllShutters();
            for (let b of this.effect) this.agent.beliefs.apply(b);
            break;
        }
    }
}

module.exports = OpenShuttersFullIntention;
