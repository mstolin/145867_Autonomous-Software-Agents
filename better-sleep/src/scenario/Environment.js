const House = require("../lib/world/House");
const { initRooms } = require("./world/rooms");
const { initPersons } = require("./world/persons/Persons");
const personIds = require("./world/persons/PersonIds");
const roomIds = require("./world/rooms/RoomIds");
const { initHouseAgent } = require("./bdi/agents/house-agent/HouseAgent");
const { initLightAgent } = require("./bdi/agents/light-agent");
//const shutterAgents = require("./bdi/agents/shutter-agent");
const {
    SenseMovementGoal,
    SenseDaytimeGoal,
    SenseIlluminanceGoal,
} = require("./bdi/agents/house-agent/Goals");

function initHouse() {
    return new Promise((resolve, _) => {
        resolve(new House());
    });
}

function createAgents(house) {
    return new Promise((resolve, _) => {
        house.houseAgent = initHouseAgent();
        house.lightAgent = initLightAgent(house);
        // TODO house.shutterAgent = initShutterAgent(house)
        resolve(house);
    });
}

function createPersons(house) {
    return new Promise((resolve, _) => {
        house.persons = initPersons();
        resolve(house);
    });
}

function createRooms(house) {
    return new Promise((resolve, _) => {
        house.rooms = initRooms();
        resolve(house);
    });
}

function setAgents(house) {
    return new Promise((resolve, _) => {
        for (const room of Object.values(house.rooms)) {
            room.lightAgent = house.lightAgent;
            room.shutterAgent = house.shutterAgent;
        }
        resolve(house);
    })
}

function setInitialLocations(house) {
    return new Promise((resolve, _) => {
        // Set initial location of persons
        house
            .getPerson(personIds.ID_PERSON_SANDRA)
            .setLocation(roomIds.ID_ROOM_BEDROOM);
        house
            .getPerson(personIds.ID_PERSON_BOB)
            .setLocation(roomIds.ID_ROOM_BEDROOM);

        resolve(house);
    });
}

function setInitialBeliefs(house) {
    return new Promise((resolve, _) => {
        let lightAgent = house.lightAgent;
        // Set initial beliefs for all room agents
        for (const room of Object.values(house.rooms)) {
            //let shutterAgent = shutterAgents[room.name];

            lightAgent.beliefs.declare(`LIGHT ${room.mainLight.name}`);
            lightAgent.beliefs.declare("DAYTIME time");
            lightAgent.beliefs.declare(`ROOM ${room.name}`);

            //shutterAgent.beliefs.declare("DAYTIME time");
            //shutterAgent.beliefs.declare("SHUTTER shutters");
        }

        resolve(house);
    });
}

function turnOnSensors(house) {
    return new Promise((resolve, _) => {
        // House specific sensors
        house.illuminanceSensor.turnOn();
        // Room specific sensors
        Object.keys(house.rooms).forEach((id) => {
            let room = house.getRoom(id);
            // turn all light sensors on
            room.lightSensor.turnOn();
            // turn all motion sensors on
            room.motionSensor.turnOn();
        });

        resolve(house);
    });
}

function postSensorGoals(house) {
    let houseAgent = house.houseAgent;
    return new Promise((resolve, _) => {
        /*houseAgent.postSubGoal(
            new SenseMovementGoal({
                persons: [
                    house.getPerson(personIds.ID_PERSON_SANDRA),
                    house.getPerson(personIds.ID_PERSON_BOB),
                ],
            })
        );*/
        //houseAgent.postSubGoal(new SenseIlluminanceGoal());
        houseAgent.postSubGoal(new SenseDaytimeGoal({ house }));

        resolve(house);
    });
}

function initEnvironment() {
    return initHouse()
        .then((house) => createPersons(house))
        .then((house) => createRooms(house))
        .then((house) => createAgents(house))
        .then((house) => setAgents(house))
        .then((house) => setInitialLocations(house))
        .then((house) => setInitialBeliefs(house))
        .then((house) => turnOnSensors(house))
        .then((house) => postSensorGoals(house));
}

module.exports = {
    initEnvironment,
};
