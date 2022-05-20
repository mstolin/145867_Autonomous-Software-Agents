const Room = require("../../../lib/world/Room");
const ids = require("./RoomIds");

module.exports = new Room(ids.ID_ROOM_BEDROOM, [ids.ID_ROOM_SECOND_FLOOR], 2);
