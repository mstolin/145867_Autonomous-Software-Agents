const House = require("../lib/world/House");
const Clock = require("../lib/utils/Clock");
const { roomIds } = require("./world/rooms");
const { executeRoutine } = require("./routine");
const {
    observeAllRooms,
    observePersonLocations,
    observeHouseSensors,
} = require("./observers");
const { initEnvironment } = require("./environment");

/*
    HELPER FUNCTIONS
*/

/**
 * This function triggers the motion sensors when
 * the scenario start. This is necessary because both
 * residents are in the bedroom when the scenario begins.
 *
 * @param {House} house
 * @returns {Promise<House>}
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

/**
 * This function will start the observers.
 * All residents, room sensors, and house sensors
 * are observed. This is necessary for the log
 * and useful for debugging.
 *
 * @param {House} house
 * @returns {Promise<House>}
 */
function startObservers(house) {
    return new Promise((resolve, _) => {
        observeAllRooms(house);
        observePersonLocations(house);
        observeHouseSensors(house);
        resolve(house);
    });
}

/*
    INTI ENVIRONMENT AND START ROUTINE
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
