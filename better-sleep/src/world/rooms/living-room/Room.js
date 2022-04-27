const ids = require('../RoomIds')
const Room = require('../../../classes/Room')
const lights = require('./Lights')
const shutters = require('./Shutters')

module.exports = new Room(
    'Living Room',
    [ids.ID_ROOM_KITCHEN, ids.ID_ROOM_FIRST_FLOOR],
    shutters,
    lights
)
