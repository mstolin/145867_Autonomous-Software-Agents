const ids = require('../RoomIds')
const Room = require('../../../classes/Room')
const lights = require('./Lights')
const shutters = require('./Shutters')

module.exports = new Room(
    'Kitchen',
    [ids.ID_ROOM_LIVING_ROOM, ids.ID_ROOM_FIRST_FLOOR],
    shutters,
    lights
)
