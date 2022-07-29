const Intention = require("../../../../../lib/bdi/Intention");
const { TurnOnShuttersGoal } = require("../Goals");

/**
 * @class TurnOnShuttersIntention
 *
 * This intention is responsible to turn on all shutters
 * in the morning at the given hour by the goal.
 */
class TurnOnShuttersIntention extends Intention {
    static applicable(goal) {
        return goal instanceof TurnOnShuttersGoal;
    }

    *exec() {
        this.agent.room.shutters.forEach((shutter) => {
            try {
                shutter.turnOn();
                this.agent.beliefs.declare("on shutters");
            } catch (err) {
                this.log(err);
            }
        });
    }
}

module.exports = TurnOnShuttersIntention;
