const Agent = require("./Agent");

class RoomAgent extends Agent {

    /** @type {Room} */
    //#room;

    /** @type {Array<Room>} */
    #rooms = [];

    /**
     * Constructs a RoomAgent instance.
     *  
     * @param {string} name
     */
    constructor(name) {
        super(name);
    }

    /**
     * Returns the agents room.
     */
    /*get room() {
        return this.#room;
    }*/

    addRoom(room) {
        this.#rooms.push(room);
    }
}

module.exports = RoomAgent;
