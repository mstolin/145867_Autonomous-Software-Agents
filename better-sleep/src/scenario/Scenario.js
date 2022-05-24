/*
    IMPORTS
*/
// BDI
const houseAgent = require("./bdi/agents/house-agent/HouseAgent");
const {
    MorningGoal,
    EveningGoal,
    SenseMovementGoal,
    SenseDaytimeGoal,
} = require("./bdi/agents/house-agent/Goals");
// Utils
const Clock = require("../lib/utils/Clock");
// World
const house = require("./world/House");
const personIds = require("./world/persons/PersonIds");
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
houseAgent.postSubGoal(new MorningGoal({ hh: 7, mm: 0 }));
houseAgent.postSubGoal(new EveningGoal({ hh: 23, mm: 0 }));
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

initEnvironment()
    .then((_) => {
        turnOnAllDevices();
    })
    .then((_) => {
        // Start the clock
        Clock.startTimer(1);
    });
