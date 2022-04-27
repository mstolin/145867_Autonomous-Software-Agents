// Imports
const Agent = require('./classes/Agent')
const Clock = require('./classes/Clock')
const Goal = require('./classes/Goal')
const House = require('./classes/House')
const Intention = require('./classes/Intention')
const persons = require('./world/persons/Persons')
const personIds = require('./world/persons/PersonIds')
const rooms = require('./world/rooms/Rooms')
const roomIds = require('./world/rooms/RoomIds')

// Create house
let defaultLocations = {}
defaultLocations[personIds.ID_PERSON_SANDRA] = roomIds.ID_ROOM_BEDROOM
defaultLocations[personIds.ID_PERSON_BOB] = roomIds.ID_ROOM_BEDROOM

let house = new House(persons, rooms, defaultLocations)

// Set observers
house.peopleLocations.observe(personIds.ID_PERSON_SANDRA, (v, k) => console.log(`${k} has entered ${v}`))
house.peopleLocations.observe(personIds.ID_PERSON_BOB, (v, k) => console.log(`${k} has entered ${v}`))

// Create the schedule
Clock.global.observe('mm', (_) => {
    let time = Clock.global

    /**
     * 1. Snadra and Bob wake up
     * 2.1. Sandra walks into the bathroom and needs 15min 
     * 2.2. At the same time Bob walks into the Kitchen to make breakfast
     * 3.1. Sandra finishes in the bathroom and walks into the living room
     * 3.2. At the same time, Bob finishes in the Kitchen and walks into the living room as well to eat breakfast w Sandra
     * 4.1. Sandra and Bob finish eating breakfast, Sandra walks out of the house for work
     * 4.2. Bob walks into the kitchen to cleanup
     * 5. Bob walks into the bathroom to get ready
     * 6. Bob walks into the guest room to start working
     */

    if(time.dd == 0 && time.hh == 1 && time.mm == 0) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_BEDROOM,
            roomIds.ID_ROOM_SECOND_FLOOR
        )
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_BEDROOM,
            roomIds.ID_ROOM_SECOND_FLOOR
        )
    }

    if(time.dd == 0 && time.hh == 1 && time.mm == 1) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_SECOND_FLOOR,
            roomIds.ID_ROOM_BATHROOM
        )
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_SECOND_FLOOR,
            roomIds.ID_ROOM_FIRST_FLOOR
        )
    }

    if(time.dd == 0 && time.hh == 1 && time.mm == 2) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_FIRST_FLOOR,
            roomIds.ID_ROOM_KITCHEN
        )
    }

    if(time.dd == 0 && time.hh == 1 && time.mm == 15) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_BATHROOM,
            roomIds.ID_ROOM_SECOND_FLOOR
        )

        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_KITCHEN,
            roomIds.ID_ROOM_LIVING_ROOM
        )
    }

    if (time.dd == 00 && time.hh == 1 && time.mm == 16) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_SECOND_FLOOR,
            roomIds.ID_ROOM_FIRST_FLOOR
        )
    }

    if (time.dd == 00 && time.hh == 1 && time.mm == 17) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_FIRST_FLOOR,
            roomIds.ID_ROOM_LIVING_ROOM
        )
    } 

    if(time.dd == 0 && time.hh == 1 && time.mm == 45) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_LIVING_ROOM,
            roomIds.ID_ROOM_FIRST_FLOOR
        )
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_LIVING_ROOM,
            roomIds.ID_ROOM_FIRST_FLOOR
        )
    }

    if(time.dd == 0 && time.hh == 1 && time.mm == 46) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_FIRST_FLOOR,
            roomIds.ID_ROOM_SECOND_FLOOR
        )
    }

    if(time.dd == 0 && time.hh == 1 && time.mm == 47) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_SECOND_FLOOR,
            roomIds.ID_ROOM_BATHROOM
        )
    }

    if(time.dd == 0 && time.hh == 2 && time.mm == 0) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_BATHROOM,
            roomIds.ID_ROOM_SECOND_FLOOR
        )
    }

    if(time.dd ==0 && time.hh == 2 && time.mm == 1) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_SECOND_FLOOR,
            roomIds.ID_ROOM_GUESTROOM
        )
    }

    var houseAgent = new Agent('House Agent')

    class SetupMorningLight extends Goal {
        isConditionTrue(helper) {
            if(helper.hh && helper.mm) {
                return helper.hh == this.condition.hh && helper.mm == this.condition.mm
            } else {
                return false
            }
        }
    }

    class MorningLight extends Intention {
        static applicable(goal) {
            return goal instanceof SetupMorningLight
        }

        *exec() {
            while(true) {
                yield Clock.global.notifyChange('mm')
                if(this.goal.isConditionTrue(Clock.global)) {
                    console.log('Turn on the Morning Light')
                    /**
                     * e.g.:
                     * houseAgent.turnOnLight()
                     * or
                     * this.agent.devices[bedroom-main-light].turnOn
                     */
                    break
                }
            }
        }
    }

    class TurnOnLight extends Goal {
        isConditionTrue(location) {
            //console.log('LOCATION', location)
            return location == roomIds.ID_ROOM_SECOND_FLOOR
        } 
    }

    class TurnOnLightIntention extends Intention {
        static applicable(goal) {
            return goal instanceof TurnOnLight
        }

        *exec() {
            while(true) {
                yield house.peopleLocations.notifyChange(personIds.ID_PERSON_SANDRA)
                //yield house.peopleLocations.notifyChange(personIds.ID_PERSON_BOB)
                if(this.goal.isConditionTrue(house.peopleLocations[personIds.ID_PERSON_SANDRA])) {
                    console.log('Turn on light in second floor because of sandra')
                    break
                }
            }
        }
    }

    houseAgent.addIntention(MorningLight)
    houseAgent.addIntention(TurnOnLightIntention)
    houseAgent.postSubGoal(new SetupMorningLight({hh: 1, mm: 1}))
    let turnOnLightConditions = {}
    turnOnLightConditions[personIds.ID_PERSON_SANDRA] = roomIds.ID_ROOM_SECOND_FLOOR
    houseAgent.postSubGoal(new TurnOnLight(turnOnLightConditions))

})
