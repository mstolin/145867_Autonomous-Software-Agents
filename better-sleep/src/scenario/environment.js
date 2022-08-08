const House = require("../lib/world/House");
const { initRooms } = require("./world/rooms");
const { initPersons, personIds } = require("./world/persons");
const { roomIds } = require("./world/rooms");
const { initHouseAgent } = require("./bdi/agents/house-agent");
const { initLightAgents } = require("./bdi/agents/light-agent");
const { initShutterAgents } = require("./bdi/agents/shutter-agent");
const {
    SenseMovementGoal,
    SenseDaytimeGoal,
    SenseIlluminanceGoal,
} = require("./bdi/agents/house-agent");

/**
 * This function initiates the house
 * of the scenario.
 * 
 * @returns {Promise<House>}
 */
function initHouse() {
    return new Promise((resolve, _) => {
        resolve(new House());
    });
}

/**
 * This function initiates the House-Agent, Light-Agents,
 * and the Shutter-Agents. Additionally it will add them
 * to the given house.
 * 
 * @param {House} house 
 * @returns {Promise<House>}
 */
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

/**
 * This function ititiates all residents and
 * adds them to the given house instance.
 * 
 * @param {House} house 
 * @returns {Promise<House>}
 */
function createPersons(house) {
    return new Promise((resolve, _) => {
        house.persons = initPersons();
        resolve(house);
    });
}

/**
 * This function initiates all rooms of the
 * house.
 * 
 * @param {House} house 
 * @returns {Promise<House>}
 */
function createRooms(house) {
    return new Promise((resolve, _) => {
        house.rooms = initRooms();
        resolve(house);
    });
}

/**
 * This function sets the initial locations of
 * bob and sandra to the bedroom.
 * 
 * @param {House} house 
 * @returns {Promise<House>}
 */
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

/**
 * Updates the initial beliefs of the given light agent.
 * 
 * It sets:
 * - LIGHT to the name of the given main light
 * - DAYTIME to time
 * - ROOM to the name of the given room
 * - The room type
 * - Occupation status of the room (initially only bedroom is occupied)
 * 
 * @param {LightAgent} lightAgent 
 * @param {Room} room 
 */
function updateLightAgentBeliefs(lightAgent, room) {
    lightAgent.beliefs.declare(`LIGHT ${room.mainLight.name}`);
    lightAgent.beliefs.declare("DAYTIME time");
    lightAgent.beliefs.declare(`ROOM ${room.name}`);
    lightAgent.beliefs.declare(`${room.name.toUpperCase()} ${room.name}`);
    if (room.name == roomIds.ID_ROOM_BEDROOM) {
        lightAgent.beliefs.undeclare(`free ${room.name}`);
    } else {
        lightAgent.beliefs.declare(`free ${room.name}`);
    }
}

/**
 * Sets the initial beliefs of the given shutter agent.
 * 
 * It sets:
 * - DAYTIME to time
 * - SHUTTER to shutter
 * 
 * @param {ShutterAgent} shutterAgent 
 */
function updateShutterAgentBeliefs(shutterAgent) {
    shutterAgent.beliefs.declare("DAYTIME time");
    shutterAgent.beliefs.declare("SHUTTER shutters");
}

/**
 * This function updates the initial beleifs of all 
 * agents of the house.
 * 
 * @param {House} house 
 * @returns {Promise<House>}
 */
function setInitialBeliefs(house) {
    return new Promise((resolve, _) => {
        // Set initial beliefs for all room agents
        for (const room of Object.values(house.rooms)) {
            let shutterAgent = room.shutterAgent;
            let lightAgent = room.lightAgent;
            updateLightAgentBeliefs(lightAgent, room);
            updateShutterAgentBeliefs(shutterAgent);
        }
        resolve(house);
    });
}

/**
 * This function turns on all sensor deices of the
 * house.
 * 
 * @param {House} house 
 * @returns {Promise<House>}
 */
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

/**
 * This function start the sensor intentions of the house agent.
 * 
 * @param {House} house 
 * @returns {Promise<House>}
 */
function postSensorGoals(house) {
    let houseAgent = house.houseAgent;
    return new Promise((resolve, _) => {
        houseAgent.postSubGoal(new SenseMovementGoal({ rooms: house.rooms }));
        houseAgent.postSubGoal(new SenseIlluminanceGoal({ house }));
        houseAgent.postSubGoal(new SenseDaytimeGoal({ rooms: house.rooms }));
        resolve(house);
    });
}

/**
 * This function will initialize the environment for the
 * scenario.
 * 
 * @returns {Promise<House>}
 */
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
