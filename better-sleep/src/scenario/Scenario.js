/*
    IMPORTS
*/
// World
const roomIds = require("./world/rooms/RoomIds");
// Utils
const Clock = require("../lib/utils/Clock");
// Scenario
const executeRoutine = require("./Routine");
// Observers
const {
    observeAllRooms,
    observePersonLocations,
    observeHouseSensors,
} = require("./observers");
// Environment
const { initEnvironment } = require("./Environment");

/*
    HELPER FUNCTIONS
*/
function triggerMotionSensors(house) {
    return new Promise((resolve, _) => {
        let room = house.getRoom(roomIds.ID_ROOM_BEDROOM);
        let persons = Object.values(house.persons);
        for (person of persons) {
            room.addResident(person);
        }
        resolve(house);
    });
}

function startObservers(house) {
    return new Promise((resolve, _) => {
        observeAllRooms(house);
        observePersonLocations(house);
        observeHouseSensors(house);
        resolve(house);
    });
}

/*
    ROUTINE
*/
initEnvironment()
    .then((house) => startObservers(house))
    .then((house) => triggerMotionSensors(house))
    .then((house) => {
        // Start the routine when the clock starts
        Clock.global.observe("mm", () => {
            let time = Clock.global;
            executeRoutine(time, house);
        });
        // To simplify things, the day starts at 5 in the morning
        Clock.global.set("hh", 5);
        // Start the clock
        Clock.startTimer(1);
    })
    .catch((err) => console.error("ERROR", err));
