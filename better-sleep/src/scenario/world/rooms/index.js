const RoomFactory = require("./RoomFactory");
const ids = require("./RoomIds");

function initRooms() {
    let rooms = {};
    rooms[ids.ID_ROOM_FIRST_FLOOR] = RoomFactory.createRoom(
        ids.ID_ROOM_FIRST_FLOOR
    );
    rooms[ids.ID_ROOM_KITCHEN] = RoomFactory.createRoom(ids.ID_ROOM_KITCHEN);
    rooms[ids.ID_ROOM_LIVING_ROOM] = RoomFactory.createRoom(
        ids.ID_ROOM_LIVING_ROOM
    );
    rooms[ids.ID_ROOM_SECOND_FLOOR] = RoomFactory.createRoom(
        ids.ID_ROOM_SECOND_FLOOR
    );
    rooms[ids.ID_ROOM_BATHROOM] = RoomFactory.createRoom(ids.ID_ROOM_BATHROOM);
    rooms[ids.ID_ROOM_GUESTROOM] = RoomFactory.createRoom(
        ids.ID_ROOM_GUESTROOM
    );
    rooms[ids.ID_ROOM_BEDROOM] = RoomFactory.createRoom(ids.ID_ROOM_BEDROOM);
    return rooms;
}

module.exports = { initRooms };
