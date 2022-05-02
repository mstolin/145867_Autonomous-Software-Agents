/*
    IMPORTS
*/
// libs
const _ = require('lodash');
// BDI
const houseAgent = require('./bdi/agents/house-agent/HouseAgent')
const houseAgentGoals = require('./bdi/agents/house-agent/Goals')
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
