/*
    IMPORTS
*/
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
const house = require('./world/House')
const personIds = require('./world/persons/PersonIds')
const roomIds = require('./world/rooms/RoomIds')
// Scenario
const startRoutine = require('./Routine')


/*
    ENVIRONMENT
*/
// Set some test observers
house.getPerson(personIds.ID_PERSON_SANDRA).observe('location', (v, _) => console.log(`[SANDRA] Sandra has entered ${v}`))
house.getPerson(personIds.ID_PERSON_BOB).observe('location', (v, _) => console.log(`[BOB] Bob has entered ${v}`))
house.getRoom(roomIds.ID_ROOM_BEDROOM).mainLight.observe('state', (v, _) => console.log(`[BEDROOM] Bedroom main light changed state to ${v}`))
Object
    .keys(house.rooms)
    .forEach(room => house.getRoom(room).shutters.forEach(
        shutter => shutter.observe('state', (v, _) => console.log(`[${room}] Shutter has changed state to ${v}`))
    )
)

/*
    AGENTS, INTENTIONS, AND GOALS
*/
// Turn on the light in the morning
let morningLightGoal = new Goal('bedroom_light', 'on')
class TurnOnLightInTheMorning extends Intention {
    static applicable(goal) {
        return goal == 'morningLight'
    }
    *exec() {
        Clock.global.observe('mm', () => {
            let time = Clock.global
            if(time.hh == 1 && time.mm == 0) {
                house.getRoom(roomIds.ID_ROOM_BEDROOM).mainLight.turnOn(500, 2000)
            }
        })
    }
}

// Open all shutters in the morning
let shuttersOpenGoal = new Goal('shutters', 'open')
class OpenShutters extends Intention {
    static applicable(goal) {
        return goal == 'openShutters'
    }
    *exec() {
        Clock.global.observe('mm', () => {
            let time = Clock.global
            if(time.hh == 1 && time.mm == 0) {
                // Open all shutters
                Object.keys(house.rooms)
                    .forEach(room => house.getRoom(room).shutters.forEach(shutter => shutter.open()))
            }
        })
    }
}

// House Agent
let beliefs = _.merge(house.locations, {'bedroom_light': 'off', 'shutters': 'closed'})
let houseAgentBeliefs = new BeliefSet(beliefs) // the house agent needs to know about the people locations
let houseAgent = new Agent('House Agent', houseAgentBeliefs)
houseAgent.addIntention(TurnOnLightInTheMorning)
houseAgent.addIntention(OpenShutters)
houseAgent.postSubGoals({
    'morningLight': morningLightGoal,
    'openShutters': shuttersOpenGoal
}).catch(err => console.log(err))

/*
    ROUTINE
*/
// Start the routine when the clock starts
Clock.global.observe('mm', () => {
    let time = Clock.global
    startRoutine(time, house)
})

// Start the clock
Clock.startTimer()
//Clock.wallClock()
