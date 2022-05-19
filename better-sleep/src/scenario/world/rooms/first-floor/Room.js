const ids = require("../RoomIds");
const Room = require("../../../../lib/world/Room");

module.exports = new Room(
    "First Floor",
    [ids.ID_ROOM_LIVING_ROOM, ids.ID_ROOM_KITCHEN],
    2
);
