const RoomFactory = require("./RoomFactory");
const roomIds = require("./roomIds");

function initRooms() {
    let rooms = {};
    rooms[roomIds.ID_ROOM_FIRST_FLOOR] = RoomFactory.createRoom(
        roomIds.ID_ROOM_FIRST_FLOOR
    );
    rooms[roomIds.ID_ROOM_KITCHEN] = RoomFactory.createRoom(
        roomIds.ID_ROOM_KITCHEN
    );
    rooms[roomIds.ID_ROOM_LIVING_ROOM] = RoomFactory.createRoom(
        roomIds.ID_ROOM_LIVING_ROOM
    );
    rooms[roomIds.ID_ROOM_SECOND_FLOOR] = RoomFactory.createRoom(
        roomIds.ID_ROOM_SECOND_FLOOR
    );
    rooms[roomIds.ID_ROOM_BATHROOM] = RoomFactory.createRoom(
        roomIds.ID_ROOM_BATHROOM
    );
    rooms[roomIds.ID_ROOM_GUESTROOM] = RoomFactory.createRoom(
        roomIds.ID_ROOM_GUESTROOM
    );
    rooms[roomIds.ID_ROOM_BEDROOM] = RoomFactory.createRoom(
        roomIds.ID_ROOM_BEDROOM
    );
    return rooms;
}

module.exports = { initRooms, roomIds };
