const ids = require('../RoomIds')
const Room = require('../../../classes/Room')
const lights = require('./Lights')
const shutters = require('./Shutters')

module.exports = new Room(
    'Guestroom',
    [ids.ID_ROOM_SECOND_FLOOR],
    shutters,
    lights
)
