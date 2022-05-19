const ids = require("../RoomIds");
const Room = require("../../../../lib/world/Room");

module.exports = new Room(
    "Second Floor",
    [
        ids.ID_ROOM_BEDROOM,
        ids.ID_ROOM_BATHROOM,
        ids.ID_ROOM_GUESTROOM,
        ids.ID_ROOM_FIRST_FLOOR,
    ],
    2
);
