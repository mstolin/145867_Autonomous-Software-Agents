const Room = require('../../../../lib/world/Room')
const ids = require('../RoomIds')
const lights = require('./Lights')
const shutters = require('./Shutters')

module.exports = new Room(
    'Bedroom',
    [ids.ID_ROOM_SECOND_FLOOR],
    shutters,
    lights
)
