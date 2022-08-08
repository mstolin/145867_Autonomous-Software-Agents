const Intention = require("../../../../../lib/bdi/Intention");
const { TurnLightOffGoal } = require("../goals");

/**
 * This intentions powers the main light off.
 * @class
 */
class TurnLightOffIntention extends Intention {
    static applicable(goal) {
        return goal instanceof TurnLightOffGoal;
    }

    *exec(params) {
        let mainLight = params.mainLight;
        mainLight.turnOff();
        this.agent.beliefs.undeclare(`on ${mainLight.name}`);
    }
}

module.exports = TurnLightOffIntention;
