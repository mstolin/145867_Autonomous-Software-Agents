/*
    IMPORTS
*/
// World
const house = require("./world/House");
const personIds = require("./world/persons/PersonIds");
const Persons = require("./world/persons/Persons");
const roomIds = require("./world/rooms/RoomIds");
// BDI
const houseAgent = require("./bdi/agents/house-agent/HouseAgent");
const shutterAgents = require("./bdi/agents/shutter-agent");
const {
    SenseMovementGoal,
    SenseDaytimeGoal,
    SenseIlluminanceGoal,
} = require("./bdi/agents/house-agent/Goals");
// Utils
const Clock = require("../lib/utils/Clock");
// Scenario
const executeRoutine = require("./Routine");
// Observers
const {
    observeAllRooms,
    observeAllPersons,
    observeHouseSensors,
} = require("./observers");
// Environment
const { initEnvironment, turnOnSensors } = require("./Environment");

/*
    OBSERVERS
    For debugging purposes.
*/
observeAllRooms();
observeAllPersons();
observeHouseSensors();

/*
    AGENTS, INTENTIONS, AND GOALS
*/
houseAgent.postSubGoal(
    new SenseMovementGoal({
        persons: [
            house.getPerson(personIds.ID_PERSON_SANDRA),
            house.getPerson(personIds.ID_PERSON_BOB),
        ],
    })
);
houseAgent.postSubGoal(new SenseIlluminanceGoal());

// THIS HAS TO BE EXECUTED AFTER STARTROUTINE
// TODO MAKE THEN()
houseAgent.postSubGoal(new SenseDaytimeGoal());

//Clock.global.observe("dd", () => {
// Post goals in this observer, because these need to be recurring
// every day.

/* Goal is to turn on light in the morning to wake up everyone in the bedroom
    and to turn in it off when they are going to sleep. To adjust brightness and
    temp, PDDL intentions are supposed to handle this.
    */

//for (const shutterAgent of Object.values(shutterAgents)) {
/* The goal is to tun on the shutters in morning, when everybody
        wakes up and to turn them off in the evening when they are going
        to sleep. We only need to turn the devices on or off. PDDL intentions
        will open them according to the outdoor illuminance automatically. 
        */
//shutterAgent.postSubGoal(new TurnOnShuttersGoal({ hh: 7, mm: 0 }));
//shutterAgent.postSubGoal(new TurnOffShuttersGoal({ hh: 23, mm: 0 }));
//}
//});

/*
    ROUTINE
*/
// Start the routine when the clock starts
Clock.global.observe("mm", () => {
    let time = Clock.global;
    executeRoutine(time);
});
initEnvironment()
    .then((_) => {
        turnOnSensors();
    })
    .then((_) => {
        // trigger motion sensor for inital locations
        let room = house.getRoom(roomIds.ID_ROOM_BEDROOM);
        for (person of Object.values(Persons)) {
            room.addResident(person);
        }
    })
    .then((_) => {
        // To simplify things, the day starts at 5 in the morning
        Clock.global.set("hh", 5);
        // Start the clock
        Clock.startTimer(1);
    });
