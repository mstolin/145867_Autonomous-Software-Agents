const Intention = require("../../../../../lib/bdi/Intention");
const { TurnLightOnGoal } = require("../Goals");

class TurnLightOnIntention extends Intention {
    static applicable(goal) {
        return goal instanceof TurnLightOnGoal;
    }

    *exec() {
        try {
            this.agent.room.mainLight.turnOn();
            this.agent.beliefs.declare("on mainLight");
        } catch (err) {
            this.log(err);
        }
    }
}

module.exports = TurnLightOnIntention;
