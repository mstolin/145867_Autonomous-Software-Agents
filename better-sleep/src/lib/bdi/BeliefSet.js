class BeliefSet {

    /** @type {{string: any}} */
    #predicates = {}

    /**
     * Instantiates an instance of a BeliefSet
     * 
     * @param {{string: any}} predicates The actual beliefs
     */
    constructor(predicates) {
        this.#predicates = predicates        
    }

    /**
     * Returns the internal state of the belief
     * with the given predicate
     * 
     * @param {string} predicate the beliefs predicate
     * @returns {any} The beliefs state 
     */
    getBelief(predicate) {
        if(!this.#predicates.hasOwnProperty(predicate)) {
            throw(`Predicate with name ${predicate} does not exist`)
        }
        return this.#predicates[predicate]
    }

    /**
     * Sets a new value for the belief.
     *  
     * @param {string} name The beliefs predicate
     * @param {any} value The beliefs value
     */
    setPredicate(name, value) {
        this.#predicates[name] = value
    }

    /**
     * Checks if the BeliefSet includes a belief
     * with the given predicate.
     * 
     * @param {string} predicate The beliefs predicate 
     * @returns {boolean} True if predicate is included
     */
    includesPredicate(predicate) {
        return Object.keys(this.#predicates).includes(predicate)
    }

}

module.exports = BeliefSet
