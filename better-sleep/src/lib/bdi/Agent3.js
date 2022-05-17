class Agent {

    #delay = 1

    #name
    #beliefs
    /** @type {[Intention]} */
    #intentions = []

    constructor(name, beliefs) {
        this.#name = name
        this.#beliefs = beliefs
    }

    async #runControlLoop(subGoals) {
        // 1. Observe the world
        // 2. Update beliefs
        // 3. Deliberation
        // 4. Means-End
        // 5. Execute
        for(let goalName in subGoals) { // DELIBERATE()
            let goal = subGoals[goalName]
            // 1. Check if the agent can change the environment based on its beliefs
            if(!this.#beliefs.includesPredicate(goal.property)) {
                return Promise.reject(`${goal.property} is not part of the agent belief set`)
            }
            for(const IntentionClass of Object.values(this.#intentions)) {
                let intention = new IntentionClass()
                let success = await intention.run(goal, this.#beliefs)
            }
        }
        

        // run forever
        setTimeout(() => this.#runControlLoop(subGoals), this.#delay)
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

    async postSubGoals(goals) {
        await this.#runControlLoop(goals)
    }

}

module.exports = Agent
