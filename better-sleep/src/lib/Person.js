class Person{

    /** @type {string} */
    #name

    /**
     * Constructs a Person instance
     * @param {string} name Name of the Person
     */
    constructor(name) {
        this.#name = name
    }

    get name() {
        return this.#name
    }

}

module.exports = Person
