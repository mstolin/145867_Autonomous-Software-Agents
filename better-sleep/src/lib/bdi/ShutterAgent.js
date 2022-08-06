const Agent = require("./Agent");

class ShutterAgent extends Agent {
    /** @type {Room} */
    #room;

    /**
     * Constructs a RoomAgent instance.
     *
     * @param {string} name
     * @param {Room} room
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

module.exports = ShutterAgent;
