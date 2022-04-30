const House = require('../../lib/world/House')
const rooms = require('./rooms/Rooms')
const roomIds = require('./rooms/RoomIds')
const persons = require('./persons/Persons')
const personIds = require('./persons/PersonIds')

let defaultLocations = {}
defaultLocations[personIds.ID_PERSON_SANDRA] = roomIds.ID_ROOM_BEDROOM
defaultLocations[personIds.ID_PERSON_BOB] = roomIds.ID_ROOM_BEDROOM
let house = new House(persons, rooms, defaultLocations)
module.exports = house
