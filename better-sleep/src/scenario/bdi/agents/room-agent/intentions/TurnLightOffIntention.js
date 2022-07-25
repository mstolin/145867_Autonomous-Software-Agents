const Intention = require("../../../../../lib/bdi/Intention");
const { TurnLightOffGoal } = require("../Goals");

class TurnLightOffIntention extends Intention {
    static applicable(goal) {
        return goal instanceof TurnLightOffGoal;
    }

    *exec() {
        try {
            this.agent.room.mainLight.turnOff();
            this.agent.beliefs.undeclare("on mainLight");
        } catch (err) {
            this.log(err);
        }
    }
}

module.exports = TurnLightOffIntention;
