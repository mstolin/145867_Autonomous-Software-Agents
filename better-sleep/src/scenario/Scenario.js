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
    HOUSE AGENT SENSOR INTENTIONS
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
houseAgent.postSubGoal(new SenseDaytimeGoal());

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
