const ids = require("./RoomIds");
const Room = require("../../../lib/world/Room");

module.exports = new Room(
    ids.ID_ROOM_SECOND_FLOOR,
    [
        ids.ID_ROOM_BEDROOM,
        ids.ID_ROOM_BATHROOM,
        ids.ID_ROOM_GUESTROOM,
        ids.ID_ROOM_FIRST_FLOOR,
    ],
    2
);
