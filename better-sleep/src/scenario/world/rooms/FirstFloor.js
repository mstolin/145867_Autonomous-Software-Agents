const ids = require("./RoomIds");
const Room = require("../../../lib/world/Room");

module.exports = new Room(
    ids.ID_ROOM_FIRST_FLOOR,
    [ids.ID_ROOM_LIVING_ROOM, ids.ID_ROOM_KITCHEN],
    2
);
