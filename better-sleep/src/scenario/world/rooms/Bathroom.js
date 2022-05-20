const Room = require("../../../lib/world/Room");
const ids = require("./RoomIds");

module.exports = new Room(ids.ID_ROOM_BATHROOM, [ids.ID_ROOM_FIRST_FLOOR], 2);
