const Intention = require("../../../../../lib/bdi/Intention");
const { TurnOnShuttersGoal } = require("../goals");

/**
 * This intention is responsible to turn on all shutters.
 * @class
 */
class TurnOnShuttersIntention extends Intention {
    static applicable(goal) {
        return goal instanceof TurnOnShuttersGoal;
    }

    *exec() {
        this.agent.room.shutters.forEach((shutter) => {
            shutter.turnOn();
            this.agent.beliefs.declare("on shutters");
        });
    }
}

module.exports = TurnOnShuttersIntention;
