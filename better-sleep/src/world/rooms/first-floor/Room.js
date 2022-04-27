const ids = require('../RoomIds')
const lights = require('./Lights')
const shutters = require('./Shutters')

module.exports = new Room(
    'First Floor',
    [ids.ID_ROOM_LIVING_ROOM, ids.ID_ROOM_KITCHEN, ids.ID_ROOM_FIRST_FLOOR],
    shutters,
    lights
)
