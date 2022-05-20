const Intention = require("../../../../../lib/bdi/Intention");
const PlanningGoal = require("../../../../../lib/pddl/PlanningGoal"); // TODO SHould come from extra file
const { SenseMovementGoal } = require("../Goals");
const roomAgents = require("../../room-agent");
const house = require("../../../../world/House");

/**
 * @class
 *
 * This intention works as a sensor.
 * It is supposed to tell a specific room
 * agent if a resident entered its room.
 */
class SenseMovementIntention extends Intention {
    static applicable(goal) {
        return goal instanceof SenseMovementGoal;
    }

    #genRoomAgentPlanningGoal(mainLight) {
        return new PlanningGoal({
            goal: [`on ${mainLight}`, `morning-brightness ${mainLight}`],
        });
    }

    /**
     * Generates an async promise that is being
     * used by the intention to dyanamically push
     * a goal if a persons location has changed.
     *
     * @param {Person} person
     * @returns {Promise}
     */
    #genPersonPromise(person) {
        let goalPromise = new Promise(async (_) => {
            while (true) {
                let location = await person.notifyChange("location");
                let roomAgent = roomAgents[location];
                let room = house.getRoom(location);
                if (roomAgent !== null && room !== null) {
                    // update agent beliefs
                    roomAgent.beliefs.declare("in " + person.name);
                    // push goal
                    roomAgent.postSubGoal(
                        this.#genRoomAgentPlanningGoal(room.mainLight.name)
                    ); // TODO Maybe this is not necessary here, onlu update beliefs
                }
            }
        });
        return goalPromise;
    }

    *exec() {
        let personGoals = [];
        let persons = this.goal.parameters.persons;
        for (const person of persons) {
            let personGoalPromise = this.#genPersonPromise(person);
            personGoals.push(personGoalPromise);
        }
        yield Promise.all(personGoals);
    }
}

module.exports = SenseMovementIntention;
