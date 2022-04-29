// libs
const _ = require('lodash');

// BDI
const Agent = require('../lib/bdi/Agent')
const BeliefSet = require('../lib/bdi/BeliefSet')
const Goal = require('../lib/bdi/Goal')
const Intention = require('../lib/bdi/Intention')

// Utils
const Clock = require('../lib/utils/Clock')

// World
const House = require('../lib/House')
const persons = require('../world/persons/Persons')
const personIds = require('../world/persons/PersonIds')
const rooms = require('../world/rooms/Rooms')
const roomIds = require('../world/rooms/RoomIds')

// Scenario
const startRoutine = require('./Routine')

// Create the house
let defaultLocations = {}
defaultLocations[personIds.ID_PERSON_SANDRA] = roomIds.ID_ROOM_BEDROOM
defaultLocations[personIds.ID_PERSON_BOB] = roomIds.ID_ROOM_BEDROOM
let house = new House(persons, rooms, defaultLocations)

// Set some test observers
house.peopleLocations.observe(personIds.ID_PERSON_SANDRA, (v, k) => console.log(`${k} has entered ${v}`))
house.peopleLocations.observe(personIds.ID_PERSON_BOB, (v, k) => console.log(`${k} has entered ${v}`))

// Goals
let morningLightGoal = new Goal('bedroom_light', 'on')
class TurnOnLightInTheMorning extends Intention {
    /*static applicable(goal) {
        return goal instanceof MorningLightGoal
    }*/
    *exec() {
        while(true) {
            yield Clock.global.notifyChange('mm')
            if(Clock.global.hh == 1 && Clock.global.mm == 0) {
                console.log('Its 7, wake up!')
                break
            }
        }
    }
}

// House Agent
let beliefs = _.merge(defaultLocations, {'bedroom_light': 'off'})
let houseAgentBeliefs = new BeliefSet(beliefs) // the house agent needs to know about the people locations
let houseAgent = new Agent('House Agent', houseAgentBeliefs)
houseAgent.addIntention(TurnOnLightInTheMorning)
houseAgent.postSubGoal(morningLightGoal).catch(err => console.error('Not able to achieve goal morningLightGoal:', err))


// Start the routine when the clock starts
Clock.global.observe('mm', () => {
    let time = Clock.global
    startRoutine(time, house)
})

// Start the clock
Clock.startTimer()
Clock.wallClock()
