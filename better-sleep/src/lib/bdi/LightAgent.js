const Agent = require("./Agent");

class LightAgent extends Agent {
    /** @type {Object<String, Room>} */
    #rooms;

    /**
     * Constructs a RoomAgent instance.
     *
     * @param {string} name
     */
    constructor(name, rooms) {
        super(name);
        this.#rooms = rooms;
    }

    /**
     * Returns the agents room.
     */
    get rooms() {
        return this.#rooms;
    }
}

module.exports = LightAgent;
