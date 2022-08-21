const Room = require("../../../lib/world/Room");
const ids = require("./roomIds");

const doors = {};
doors[ids.ID_ROOM_LOWER_FLOOR] = [ids.ID_ROOM_LIVING_ROOM, ids.ID_ROOM_KITCHEN];
doors[ids.ID_ROOM_LIVING_ROOM] = [ids.ID_ROOM_KITCHEN, ids.ID_ROOM_LOWER_FLOOR];
doors[ids.ID_ROOM_KITCHEN] = [ids.ID_ROOM_LIVING_ROOM, ids.ID_ROOM_LOWER_FLOOR];
doors[ids.ID_ROOM_UPPER_FLOOR] = [
    ids.ID_ROOM_BEDROOM,
    ids.ID_ROOM_BATHROOM,
    ids.ID_ROOM_GUESTROOM,
    ids.ID_ROOM_LOWER_FLOOR,
];
doors[ids.ID_ROOM_BEDROOM] = [ids.ID_ROOM_UPPER_FLOOR];
doors[ids.ID_ROOM_GUESTROOM] = [ids.ID_ROOM_UPPER_FLOOR];
doors[ids.ID_ROOM_BATHROOM] = [ids.ID_ROOM_LOWER_FLOOR];

/**
 * The RoomFactory is used to initate a specific room
 * instance.
 * @class
 */
class RoomFactory {
    static #numberOfShutters = 2;

    /**
     * Initates the room instance for the given room ID.
     *
     * @param {string} id
     * @returns {Room}
     */
    static createRoom(id) {
        return new Room(id, doors[id], this.#numberOfShutters);
    }
}

module.exports = RoomFactory;
