const ids = require("./RoomIds");
const Room = require("../../../lib/world/Room");

module.exports = new Room(ids.ID_ROOM_GUESTROOM, [ids.ID_ROOM_SECOND_FLOOR], 2);
