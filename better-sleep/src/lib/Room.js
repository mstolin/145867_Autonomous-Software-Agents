class Room {

    /** @type {string} */
    #name
    /** @type {Light} */
    #mainLight
    /** @type {Array<string>} */
    #doors = []
    /** @type {{string: Shutter}} */
    #shutters = {}
    /** @type {{string: Light}} */
    #smallLights = {}

    /**
     * Constructs a new Room instance.
     * 
     * @param {string} name 
     * @param {Array<string>} doors 
     * @param {{string: Shutter}} shutters 
     * @param {{string: Light}} smallLights 
     */
    constructor(name, doors, shutters, smallLights) {
        this.#name = name
        this.#doors = doors
        this.#shutters = shutters
        this.#smallLights = smallLights
    }

    get name() {
        return this.#name
    }

    get mainLight() {
        return this.#mainLight
    }

    get shutters() {
        return this.#shutters
    }

    /**
     * Checks if the room has a direct path
     * to the given room.
     * 
     * @param {string} roomId Destination room id
     * @returns {boolean} True if room has a direct path to the destination
     */
    hasPathToRoom(roomId) {
        return this.#doors.includes(roomId)
    }

    getSmallLight(id) {
        return this.#smallLights[id]
    }

}

module.exports = Room
