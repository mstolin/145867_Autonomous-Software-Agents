/*
    IMPORTS
*/
// libs
//const _ = require('lodash');
// BDI
const houseAgent = require("./bdi/agents/house-agent/HouseAgent");
const roomAgents = require("./bdi/agents/room-agent");
const {
    MorningGoal,
    EveningGoal,
    SenseMovementGoal,
    SenseDaytimeGoal,
} = require("./bdi/agents/house-agent/Goals");
// Utils
const Clock = require("../lib/utils/Clock");
const Logger = require("../lib/utils/Logger");
// World
const house = require("./world/House");
const personIds = require("./world/persons/PersonIds");
const roomIds = require("./world/rooms/RoomIds");
// Scenario
const startRoutine = require("./Routine");

/*
    ENVIRONMENT
*/
async function initEnvironment() {
    // Set initial location of persons
    house
        .getPerson(personIds.ID_PERSON_SANDRA)
        .setLocation(roomIds.ID_ROOM_BEDROOM);
    house
        .getPerson(personIds.ID_PERSON_BOB)
        .setLocation(roomIds.ID_ROOM_BEDROOM);
    // Set initial beliefs for all room agents
    for (const roomId of Object.keys(house.rooms)) {
        let room = house.getRoom(roomId);
        let roomAgent = roomAgents[roomId];

        roomAgent.beliefs.declare("LIGHT " + room.mainLight.name);
        roomAgent.beliefs.declare("DAYTIME time");
    }
    // Set some test observers
    house
        .getPerson(personIds.ID_PERSON_SANDRA)
        .observe("location", (v, _) =>
            Logger.prefix(personIds.ID_PERSON_SANDRA).log(`Has entered ${v}`)
        );
    house
        .getPerson(personIds.ID_PERSON_BOB)
        .observe("location", (v, _) =>
            Logger.prefix(personIds.ID_PERSON_BOB).log(`Has entered ${v}`)
        );
    Object.keys(house.rooms).forEach((id) => {
        let room = house.getRoom(id);
        room.shutters.forEach((shutter) => {
            shutter.observe("deviceState", (v, _) =>
                Logger.prefix(shutter.name).log(
                    `Has changed deviceState to ${v}`
                )
            );
            shutter.observe("state", (v, _) =>
                Logger.prefix(shutter.name).log(`Has changed state to ${v}`)
            );
        });
        room.mainLight.observe("deviceState", (v, _) => {
            Logger.prefix(room.mainLight.name).log(
                `Has changed deviceState to ${v}`
            );
        });
        room.mainLight.observe("brightness", (v, _) => {
            Logger.prefix(room.mainLight.name).log(
                `Has changed brightness to ${v}`
            );
        });
        room.mainLight.observe("temperature", (v, _) => {
            Logger.prefix(room.mainLight.name).log(
                `Has changed temperature to ${v}`
            );
        });
        room.lightSensor.observe("roomIlluminence", (v, _) =>
            Logger.prefix(room.lightSensor.name).log(
                `Illumince has changed to ${v}`
            )
        );
    });
    // turn all devices on
    Object.keys(house.rooms).forEach((id) => {
        let room = house.getRoom(id);
        // turn all light sensors on
        room.lightSensor.turnOn();
        // turn all shutters on
        room.shutters.forEach((shutter) => shutter.turnOn());
    });
}

/*
    AGENTS, INTENTIONS, AND GOALS
*/
houseAgent.postSubGoal(new MorningGoal({ hh: 1, mm: 0 }));
houseAgent.postSubGoal(new EveningGoal({ hh: 4, mm: 0 }));
houseAgent.postSubGoal(
    new SenseMovementGoal({
        persons: [
            house.getPerson(personIds.ID_PERSON_SANDRA),
            house.getPerson(personIds.ID_PERSON_BOB),
        ],
    })
);
houseAgent.postSubGoal(new SenseDaytimeGoal());

/*
    ROUTINE
*/
// Start the routine when the clock starts
Clock.global.observe("mm", () => {
    let time = Clock.global;
    startRoutine(time, house);
});

initEnvironment().then((_) => {
    // Start the clock
    Clock.startTimer(1);
});
