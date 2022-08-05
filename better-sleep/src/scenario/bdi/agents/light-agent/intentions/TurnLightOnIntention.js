const Intention = require("../../../../../lib/bdi/Intention");
const { TurnLightOnGoal } = require("../Goals");

class TurnLightOnIntention extends Intention {
    static applicable(goal) {
        return goal instanceof TurnLightOnGoal;
    }

    *exec(params) {
        let mainLight = params.mainLight;
        mainLight.turnOn();
        this.agent.beliefs.declare(`on ${mainLight.name}`);
    }
}

module.exports = TurnLightOnIntention;
