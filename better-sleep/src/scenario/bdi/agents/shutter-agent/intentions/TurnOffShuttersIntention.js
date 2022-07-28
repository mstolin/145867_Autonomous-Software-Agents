const Intention = require("../../../../../lib/bdi/Intention");
const Clock = require("../../../../../lib/utils/Clock");
const { TurnOffShuttersGoal } = require("../Goals");

/**
 * @class TurnOffShuttersIntention
 *
 * This intention is responsible to turn off all shutters
 * in the evening at the given hour by the goal.
 */
class TurnOffShuttersIntention extends Intention {
    static applicable(goal) {
        return goal instanceof TurnOffShuttersGoal;
    }

    *exec() {
        this.agent.room.shutters.forEach((shutter) => {
            try {
                shutter.turnOff();
                this.agent.beliefs.undeclare("on shutters");
            } catch (err) {
                this.log(err);
            }
        });
    }
}

module.exports = TurnOffShuttersIntention;
