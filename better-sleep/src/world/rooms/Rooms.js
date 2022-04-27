const ids = require('./RoomIds')

let rooms = {}
rooms[ids.ID_ROOM_FIRST_FLOOR] = require('./first-floor/Room')
rooms[ids.ID_ROOM_KITCHEN] = require('./kitchen/Room')
rooms[ids.ID_ROOM_LIVING_ROOM] = require('./living-room/Room')
rooms[ids.ID_ROOM_SECOND_FLOOR] = require('./second-floor/Room')
rooms[ids.ID_ROOM_BATHROOM] = require('./bathroom/Room')
rooms[ids.ID_ROOM_GUESTROOM] = require('./guestroom/Room')
rooms[ids.ID_ROOM_BEDROOM] = require('./bedroom/Room')

module.exports = rooms
