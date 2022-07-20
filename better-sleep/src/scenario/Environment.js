const house = require("./world/House");
const personIds = require("./world/persons/PersonIds");
const roomIds = require("./world/rooms/RoomIds");
const roomAgents = require("./bdi/agents/room-agent");
const shutterAgents = require("./bdi/agents/shutter-agent");

const setInitialLocations = () => {
    // Set initial location of persons
    house
        .getPerson(personIds.ID_PERSON_SANDRA)
        .setLocation(roomIds.ID_ROOM_BEDROOM);
    house
        .getPerson(personIds.ID_PERSON_BOB)
        .setLocation(roomIds.ID_ROOM_BEDROOM);
}

const setInitialBeliefs = () => {
    // Set initial beliefs for all room agents
    for (const roomId of Object.keys(house.rooms)) {
        let roomAgent = roomAgents[roomId];
        let shutterAgent = shutterAgents[roomId];

        roomAgent.beliefs.declare("LIGHT mainLight");
        roomAgent.beliefs.declare("DAYTIME time");
        roomAgent.beliefs.declare("ROOM thisRoom");

        shutterAgent.beliefs.declare("DAYTIME time");
        shutterAgent.beliefs.declare("SHUTTER shutters");
    }
}

const initEnvironment = async () => {
    setInitialLocations();
    setInitialBeliefs();
};

const turnOnSensors = () => {
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
}

module.exports = {
    initEnvironment,
    turnOnSensors,
};
