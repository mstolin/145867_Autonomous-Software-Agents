/*
    IMPORTS
*/
// World
const house = require("./world/House");
const personIds = require("./world/persons/PersonIds");
const roomIds = require("./world/rooms/RoomIds");
// BDI
const houseAgent = require("./bdi/agents/house-agent/HouseAgent");
const shutterAgents = require("./bdi/agents/shutter-agent");
const bedroomAgent = require("./bdi/agents/room-agent")[roomIds.ID_ROOM_BEDROOM];
const {
    SenseMovementGoal,
    SenseDaytimeGoal,
    SenseIlluminanceGoal
} = require("./bdi/agents/house-agent/Goals");
const {
    OpenShuttersMorningGoal,
    CloseShuttersEveningGoal
} = require("./bdi/agents/shutter-agent/Goals");
const {
    WakeUpGoal,
    SleepGoal
} = require("./bdi/agents/room-agent/Goals");
// Utils
const Clock = require("../lib/utils/Clock");
// Scenario
const startRoutine = require("./Routine");
// Observers
const { observeAllRooms, observeAllPersons } = require("./observers");
// Environment
const { initEnvironment, turnOnAllDevices } = require("./Environment");

/*
    OBSERVERS
*/
observeAllRooms();
observeAllPersons();

/*
    AGENTS, INTENTIONS, AND GOALS
*/
for (const shutterAgent of Object.values(shutterAgents)) {
    shutterAgent.postSubGoal(new OpenShuttersMorningGoal({ hh: 7, mm: 0 }));
    shutterAgent.postSubGoal(new CloseShuttersEveningGoal({ hh: 23, mm: 0 }));
}
bedroomAgent.postSubGoal(new WakeUpGoal({ hh: 7, mm: 0 }));
bedroomAgent.postSubGoal(new SleepGoal({ hh: 23, mm: 0 }));
houseAgent.postSubGoal(
    new SenseMovementGoal({
        persons: [
            house.getPerson(personIds.ID_PERSON_SANDRA),
            house.getPerson(personIds.ID_PERSON_BOB),
        ],
    })
);
houseAgent.postSubGoal(new SenseDaytimeGoal());
houseAgent.postSubGoal(new SenseIlluminanceGoal());

/*
    ROUTINE
*/
// Start the routine when the clock starts
Clock.global.observe("mm", () => {
    let time = Clock.global;
    startRoutine(time, house);
});

initEnvironment()
    .then((_) => {
        turnOnAllDevices();
    })
    .then((_) => {
        // Start the clock
        Clock.startTimer(1);
    });
