const House = require("../lib/world/House");
const { initRooms } = require("./world/rooms");
const { initPersons, personIds } = require("./world/persons");
const roomIds = require("./world/rooms/RoomIds");
const { initHouseAgent } = require("./bdi/agents/house-agent");
const { initLightAgents } = require("./bdi/agents/light-agent");
const { initShutterAgents } = require("./bdi/agents/shutter-agent");
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

        let lightAgents = initLightAgents(house);
        let shutterAgents = initShutterAgents(house);
        for (const roomId of Object.keys(house.rooms)) {
            let lightAgent = lightAgents[roomId];
            let shutterAgent = shutterAgents[roomId];
            let room = house.getRoom(roomId);
            room.lightAgent = lightAgent;
            room.shutterAgent = shutterAgent;
        }
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
        // Set initial beliefs for all room agents
        for (const roomId of Object.values(roomIds)) {
            let room = house.rooms[roomId];
            let shutterAgent = room.shutterAgent;
            let lightAgent = room.lightAgent;

            lightAgent.beliefs.declare(`LIGHT ${room.mainLight.name}`);
            lightAgent.beliefs.declare("DAYTIME time");
            lightAgent.beliefs.declare(`ROOM ${room.name}`);
            lightAgent.beliefs.declare(`${roomId.toUpperCase()} ${room.name}`);
            if (room.name == roomIds.ID_ROOM_BEDROOM) {
                lightAgent.beliefs.undeclare(`free ${room.name}`);
            } else {
                lightAgent.beliefs.declare(`free ${room.name}`);
            }

            shutterAgent.beliefs.declare("DAYTIME time");
            shutterAgent.beliefs.declare("SHUTTER shutters");
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
        houseAgent.postSubGoal(new SenseMovementGoal({ rooms: house.rooms }));
        houseAgent.postSubGoal(new SenseIlluminanceGoal({ house }));
        houseAgent.postSubGoal(new SenseDaytimeGoal({ rooms: house.rooms }));
        resolve(house);
    });
}

function initEnvironment() {
    return initHouse()
        .then((house) => createPersons(house))
        .then((house) => createRooms(house))
        .then((house) => createAgents(house))
        .then((house) => setInitialLocations(house))
        .then((house) => setInitialBeliefs(house))
        .then((house) => turnOnSensors(house))
        .then((house) => postSensorGoals(house));
}

module.exports = {
    initEnvironment,
};
