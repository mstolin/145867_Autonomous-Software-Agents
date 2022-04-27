const ids = require('../RoomIds')
const lights = require('./Lights')
const shutters = require('./Shutters')

module.exports = new Room(
    'Bathroom',
    [ids.ID_ROOM_FIRST_FLOOR],
    shutters,
    lights
)
