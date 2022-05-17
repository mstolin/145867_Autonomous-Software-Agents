/**
 * This is an experimental Agent that is
 * supposed to execute Intnetions and its plan in
 * a more async fashion.
 * 
 * The goal is that Intention should not observe in its plans
 * anymore.
 * 
 * WIP !! DO NOT USE IN PRODUCTION
 */

const Goal = require("./Goal")

/**
 * An Agent is based on Beliefs, Intentions and Goals.
 * It uses its Intention to achieve a specific Goal,
 * based on its Beliefs.
 */
class Agent {

    /** @type {[Intention]} */
    #intentions = []
    /** @type {string} */
    #name
    /** @type {BeliefSet} */
    #beliefSet
    
    /**
     * 
     * @param {string} name The agents name
     * @param {BeliefSet} beliefSet The agents initial beliefs
     */
    constructor(name, beliefSet) {
        this.#name = name
        this.#beliefSet = beliefSet
    }

    /** The agents name */
    get name() {
        return this.#name
    }

    /** The agents beliefs */
    get beliefs() {
        return this.#beliefSet
    }

    updateBelief(name, value) {
        this.#beliefSet.setPredicate(name, value)
    }

    /**
     * Adds the intention to the agent.
     * 
     * @param {Intention} intention
     * @returns {number} Number of intention
     */
    addIntention(intention) {
        return this.#intentions.push(intention)
    }

    /**
     * Tries to achieve the given goal.
     * 
     * @param {Goal} subGoal 
     * @returns {Promise}
     */
    postSubGoals(subGoals) {
        async function run(delay, subGoals, beliefSet, intentions) {
            console.log("RUN")
            for(let goalName in subGoals) {
                let goal = subGoals[goalName]
                // 1. Check if the agent can change the environment based on its beliefs
                if(!beliefSet.includesPredicate(goal.property)) {
                    return Promise.reject(`${goal.property} is not part of the agent belief set`)
                }
                
                // 2. Check if any intention of this agent can be used to reach the given goal
                for(let IntentionClass of Object.values(intentions)) {
                    if(!IntentionClass.applicable(goalName)) {
                        // Intention cannot be used to achieve the goal
                        continue
                    }

                    // 3. Use this intention to reach the given subgoal
                    let intention = new IntentionClass()
                    // Run the plan of the intention to reach the goal
                    console.log('START GOAL', goalName)
                    let success = await intention
                        .run(goal, beliefSet)
                        .catch(err => {
                            console.log(`Error running intention ${IntentionClass}`, err)
                        })

                    if(success) {
                        // Plan was successful
                        return Promise.resolve(true)
                    } else {
                        // Plan was not successful to reach the goal
                        // Try the next intention
                        continue
                    }
                }
            }
            setTimeout(() => run(delay, subGoals, beliefSet, intentions), delay)
        }
        run(0, subGoals, this.#beliefSet, this.#intentions)
    }

}

module.exports = Agent
