const ids = require('./RoomIds')

let rooms = {}
rooms[ids.ID_ROOM_FIRST_FLOOR] = require('./FirstFloor')
rooms[ids.ID_ROOM_KITCHEN] = require('./Kitchen')
rooms[ids.ID_ROOM_LIVING_ROOM] = require('./LivingRoom')
rooms[ids.ID_ROOM_SECOND_FLOOR] = require('./SecondFloor')
rooms[ids.ID_ROOM_BATHROOM] = require('./Bathroom')
rooms[ids.ID_ROOM_GUESTROOM] = require('./Guestroom')
rooms[ids.ID_ROOM_BEDROOM] = require('./Bedroom')

module.exports = rooms
