const Room = require("../../../lib/world/Room");
const ids = require("./RoomIds");

const doors = {};
doors[ids.ID_ROOM_FIRST_FLOOR] = [ids.ID_ROOM_LIVING_ROOM, ids.ID_ROOM_KITCHEN];
doors[ids.ID_ROOM_LIVING_ROOM] = [ids.ID_ROOM_KITCHEN, ids.ID_ROOM_FIRST_FLOOR];
doors[ids.ID_ROOM_KITCHEN] = [ids.ID_ROOM_LIVING_ROOM, ids.ID_ROOM_FIRST_FLOOR];
doors[ids.ID_ROOM_SECOND_FLOOR] = [
    ids.ID_ROOM_BEDROOM,
    ids.ID_ROOM_BATHROOM,
    ids.ID_ROOM_GUESTROOM,
    ids.ID_ROOM_FIRST_FLOOR,
];
doors[ids.ID_ROOM_BEDROOM] = [ids.ID_ROOM_SECOND_FLOOR];
doors[ids.ID_ROOM_GUESTROOM] = [ids.ID_ROOM_SECOND_FLOOR];
doors[ids.ID_ROOM_BATHROOM] = [ids.ID_ROOM_FIRST_FLOOR];

class RoomFactory {
    static #numberOfShutters = 2;

    static createRoom(id) {
        return new Room(id, doors[id], this.#numberOfShutters);
    }
}

module.exports = RoomFactory;
