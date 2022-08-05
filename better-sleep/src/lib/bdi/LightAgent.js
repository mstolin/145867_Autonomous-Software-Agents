const Agent = require("./Agent");

class LightAgent extends Agent {
    /** @type {Room} */
    #room;

    /**
     * Constructs a RoomAgent instance.
     *
     * @param {string} name
     */
    constructor(name, room) {
        super(name);
        this.#room = room;
    }

    /**
     * Returns the agents room.
     */
    get room() {
        return this.#room;
    }
}

module.exports = LightAgent;
