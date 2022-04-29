// Imports
//const Agent = require('./lib/Agent')
const Clock = require('../lib/utils/Clock')
//const Goal = require('./lib/Goal')
const House = require('../lib/House')
//const Intention = require('./lib/Intention')
const persons = require('../world/persons/Persons')
const personIds = require('../world/persons/PersonIds')
const rooms = require('../world/rooms/Rooms')
const roomIds = require('../world/rooms/RoomIds')
const startRoutine = require('./Routine')

// Create house
let defaultLocations = {}
defaultLocations[personIds.ID_PERSON_SANDRA] = roomIds.ID_ROOM_BEDROOM
defaultLocations[personIds.ID_PERSON_BOB] = roomIds.ID_ROOM_BEDROOM

let house = new House(persons, rooms, defaultLocations)

// Set observers
house.peopleLocations.observe(personIds.ID_PERSON_SANDRA, (v, k) => console.log(`${k} has entered ${v}`))
house.peopleLocations.observe(personIds.ID_PERSON_BOB, (v, k) => console.log(`${k} has entered ${v}`))

Clock.global.observe('mm', (key, mm) => {
    let time = Clock.global
    startRoutine(time, house)
})

Clock.startTimer()
Clock.wallClock()
