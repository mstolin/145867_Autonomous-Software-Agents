/*
    IMPORTS
*/
// libs
//const _ = require('lodash');
// BDI
const houseAgent = require('./bdi/agents/house-agent/HouseAgent')
const houseAgentGoals = require('./bdi/agents/house-agent/Goals')
// Utils
const Clock = require('../lib/utils/Clock')
const Logger = require('../lib/utils/Logger')
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
house.getPerson(personIds.ID_PERSON_SANDRA).observe('location', (v, _) => Logger.prefix(personIds.ID_PERSON_SANDRA).log(`Has entered ${v}`))
house.getPerson(personIds.ID_PERSON_BOB).observe('location', (v, _) => Logger.prefix(personIds.ID_PERSON_BOB).log(`Has entered ${v}`))
house.getRoom(roomIds.ID_ROOM_BEDROOM).mainLight.observe('state', (v, _) => Logger.prefix(roomIds.ID_ROOM_BEDROOM).log(`Main light has changed state to ${v}`))
Object
    .keys(house.rooms)
    .forEach(room => house.getRoom(room).shutters.forEach(
        shutter => shutter.observe('state', (v, _) => Logger.prefix(room).log(`Shutter has changed state to ${v}`))
    )
)

/*
    AGENTS, INTENTIONS, AND GOALS
*/
houseAgent.postSubGoals(houseAgentGoals).catch(err => console.log(err))


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
