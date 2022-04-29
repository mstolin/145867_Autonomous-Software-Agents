class Goal {

    /** @type {string} */
    #property
    /** @type {any} */
    #desiredState

    /**
     * Constructs a Goal instance
     * 
     * @param {string} property The goals property
     * @param {any} desiredState The desired state, the goal represents
     */
    constructor(property, desiredState) {
        this.#property = property
        this.#desiredState = desiredState
    }

    get property() {
        return this.#property
    }

    get desiredState() {
        return this.#desiredState
    }

    /**
     * Checks, given the current beliefs, if this
     * Goal has already been achieved.
     * 
     * @param {BeliefSet} beliefs The current beliefs
     * @returns {boolean} True if goal has already been achieved
     */
    hasAlreadyBeenAchieved(beliefs) {
        return beliefs.getBelief(this.#property) == this.#desiredState
    }

}

module.exports = Goal
