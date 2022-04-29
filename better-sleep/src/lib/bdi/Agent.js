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
    async postSubGoal(subGoal) {
        // 1. Check if the agent does know about the predicate
        if(!this.#beliefSet.includesPredicate(subGoal.property)) {
            return Promise.reject(`${subGoal.property} is not part of the agent belief set`)
        }

        // 2. Check if any intention of this agent can be used to reach the given goal
        for(let IntentionClass of Object.values(this.#intentions)) {
            if(!IntentionClass.applicable(subGoal)) {
                // Intention cannot be used to achieve the goal
                continue
            }

            // Use this intention to reach the given subgoal
            let intention = new IntentionClass(subGoal)
            // Run the plan of the intention to reach the goal
            let success = await intention
                .run()
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

        return Promise.resolve(this)
    }

}

module.exports = Agent
