const Intention = require("../../../../../lib/bdi/Intention");
const { SenseMovementGoal } = require("../Goals");

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
    *exec() {
        let personGoals = [];
        let persons = this.goal.parameters.persons;
        for (const person of persons) {
            console.log("FOR PERSON", person);
            let personGoalPromise = new Promise(async (_) => {
                while (true) {
                    let location = await person.notifyChange("location");
                    console.log(
                        "SENSE MOVEMENT INTENTION",
                        person.name,
                        location
                    );
                    // rommAgents.get(location).beliefs.update()
                }
            });
            personGoals.push(personGoalPromise);
        }
        yield Promise.all(personGoals);
    }
}

module.exports = SenseMovementIntention;
