class Goal {

    /** @type {string} */
    #property
    /** @type {any} */
    #desiredState
    /** @type {function} */
    #precondition

    /**
     * Constructs a Goal instance
     * 
     * @param {string} property The goals property
     * @param {any} desiredState The desired state, the goal represents
     * @param {function} precondition A precondition that is checked to conduct if the goal
     * has already been achieved
     */
    constructor(property, desiredState, precondition) {
        this.#property = property
        this.#desiredState = desiredState
        this.#precondition = precondition
    }

    get property() {
        return this.#property
    }

    get desiredState() {
        return this.#desiredState
    }

    /**
     * Checks, given the state, if this
     * Goal has already been achieved.
     * 
     * @param {object} state The current state/beliefs
     * @returns {boolean} True if goal has already been achieved
     */
    hasAlreadyBeenAchieved(state) {
        return this.#precondition(state)
    }

}

module.exports = Goal
