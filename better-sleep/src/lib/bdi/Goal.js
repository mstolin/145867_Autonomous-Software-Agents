class Goal {

    /** @type {string} */
    #predicate
    /** @type {any} */
    #condition

    /**
     * 
     * @param {object} condition
     */
    constructor(predicate, condition) {
        this.#predicate = predicate
        this.#condition = condition
    }

    get predicate() {
        return this.#predicate
    }

    /**
     * @return {any}
     */
    get condition() {
        return this.#condition
    } 

}

module.exports = Goal
