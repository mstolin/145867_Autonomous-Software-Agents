// Imports
const Clock = require('./classes/Clock')
const House = require('./classes/House')
const persons = require('./world/Persons')
const rooms = require('./world/Rooms')

const personIds = persons.identifier
const roomIds = rooms.identifier

// Create house
let defaultLocations = {}
defaultLocations[personIds.ID_PERSON_SANDRA] = roomIds.ID_ROOM_BEDROOM
defaultLocations[personIds.ID_PERSON_BOB] = roomIds.ID_ROOM_BEDROOM

let house = new House(persons.persons, rooms.rooms, defaultLocations)

// Set observers
house.peopleLocations.observe(personIds.ID_PERSON_SANDRA, (v, k) => console.log(`${k}: ${v}`))
house.peopleLocations.observe(personIds.ID_PERSON_BOB, (v, k) => console.log(`${k}: ${v}`))

house.movePersonTo(
    personIds.ID_PERSON_SANDRA,
    roomIds.ID_ROOM_BEDROOM,
    roomIds.ID_ROOM_SECOND_FLOOR
)

// Create the schedule
Clock.global.observe('mm', (_) => {
    let time = Clock.global
    /*if(time.hh==12 && time.mm==0)
        house.people.bob.in_room = 'kitchen'
    if(time.hh==13 && time.mm==30)
        house.people.bob.in_room = 'living_room'
    if(time.hh==19 && time.mm==0)
        house.people.bob.in_room = 'kitchen'
    if(time.hh==20 && time.mm==15)
        house.people.bob.in_room = 'living_room'*/

    if(time.hh == 7 && time.mm == 0) {
        /*
        1. Sandra and Bob wake up
        2. Sandra walks into the bathroom first and needs 15min
        */
    }

    if(time.hh == 7 && time.mm == 15) {
        /*
        1. Sandra finished in the bathroom and walks into the kitchen
        2. Bob goes into the Bathroom
        */
    }

    if(time.hh == 7 && time.mm == 30) {
        /*
        1. Sandra has finished making breakfast for both and goes into living room for eating
        2. Bob has finished in the bathroom and goes into the living room
        */
    }

    if(time.hh == 8 && time.mm == 0) {
        /*
        Both have finished eating breakfast

        1. Sandra goes to work (out of house)
        2. Bob goes into the guest room for working
        */
    }
})
