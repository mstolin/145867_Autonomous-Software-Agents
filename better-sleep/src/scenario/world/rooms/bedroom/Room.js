const Room = require('../../../lib/Room')
const ids = require('../RoomIds')
const lights = require('./Lights')
const shutters = require('./Shutters')

module.exports = new Room(
    'Bedroom',
    [ids.ID_ROOM_SECOND_FLOOR],
    shutters,
    lights
)
