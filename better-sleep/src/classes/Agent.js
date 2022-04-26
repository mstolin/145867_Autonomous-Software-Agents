class HouseAgent {

    #intentions = []

    name
    
    constructor(name) {
        this.name = name
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
     * 
     * @param {Goal} subGoal 
     * @returns {Promise}
     */
    async postSubGoal(subGoal) {
        for(let IntentionClass of Object.values(this.#intentions)) {
            if(!IntentionClass.applicable(subGoal)) {
                continue
            }

            // Use this intention to reach the given subgoal
            let intention = new IntentionClass(subGoal)
            let success = await intention
                .run()
                .catch(err => {
                    console.log('Error', err)
                })

            if(success) {
                return Promise.resolve(true)
            } else {
                continue
            }
        }

        return Promise.resolve(this)
    }

}

module.exports = HouseAgent
