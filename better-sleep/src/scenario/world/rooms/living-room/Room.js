const ids = require("../RoomIds");
const Room = require("../../../../lib/world/Room");

module.exports = new Room(
    "Living Room",
    [ids.ID_ROOM_KITCHEN, ids.ID_ROOM_FIRST_FLOOR],
    2
);
