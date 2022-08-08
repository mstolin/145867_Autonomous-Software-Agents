const Intention = require("../../../../../lib/bdi/Intention");
const { TurnOffShuttersGoal } = require("../goals");

/**
 * This intention is responsible to turn off all shutters.
 * @class
 */
class TurnOffShuttersIntention extends Intention {
    static applicable(goal) {
        return goal instanceof TurnOffShuttersGoal;
    }

    *exec() {
        this.agent.room.shutters.forEach((shutter) => {
            shutter.turnOff();
            this.agent.beliefs.undeclare("on shutters");
        });
    }
}

module.exports = TurnOffShuttersIntention;
