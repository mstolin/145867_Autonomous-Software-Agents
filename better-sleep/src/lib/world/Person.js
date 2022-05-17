const Observable = require('../utils/Observable')

class Person extends Observable {

    /** @type {string} */
    #name

    /**
     * Constructs a Person instance.
     * 
     * @param {string} name Name of the Person
     */
    constructor(name) {
        super({})
        this.#name = name
    }

    get name() {
        return this.#name
    }

    /**
     * Updates the persons location.
     * 
     * @param {string} roomId ID of the desired room
     */
    setLocation(roomId) {
        if(this.isInRoom(roomId)) {
            throw(`${this.#name} is already in ${roomId}`)
        }
        this.set('location', roomId)
    }

    /**
     * Checks if the person is in a room.
     * 
     * @param {string} roomId ID of some room
     * @returns {boolean} True if person is in the given room
     */
    isInRoom(roomId) {
        return roomId == this.location
    }

}

module.exports = Person
