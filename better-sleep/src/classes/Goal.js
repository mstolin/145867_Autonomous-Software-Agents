class Goal {

    #condition

    /**
     * 
     * @param {any} condition
     */
    constructor(condition) {
        this.#condition = condition
    }

    /**
     * @return {any}
     */
    get condition() {
        return this.#condition
    }

    /**
     * Checks whether the given conditions have been filfilled.
     * This has to be implemented for each Goal individually.
     * 
     * @param {object} helper
     * @returns {boolean} If the the condition is true
     */
    isConditionTrue(helper) {
        // Return false on default, this takes action if this method is not being overwritten
        return false
    }

}

module.exports = Goal
