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
     * @param {[Goal]} subGoals
     * @returns {Promise}
     */
    async postSubGoals(subGoals) {
        let intentions = Object
            .keys(subGoals)
            .filter(goalName => this.#beliefSet.includesPredicate(subGoals[goalName].property)) // 1. Check if goal can be achieved
            .flatMap(goalName => {
                let goal = subGoals[goalName]
                let intentions = Object
                    .values(this.#intentions)
                    .filter(IntentionClass => IntentionClass.applicable(goalName)) // 2. Get intentions for goal
                    .map(IntentionClass => new IntentionClass().run(goal, this.#beliefSet)) //  3. Instantiate intention 
                    return intentions
            })

        await Promise.all(intentions) // 4. Run all intentions 
    }

}

module.exports = Agent
