const Agent = require("../bdi/Agent");
const RoomAgent = require("../bdi/RoomAgent");
const ShutterAgent = require("../bdi/ShutterAgent");
const IlluminanceSensor = require("./IlluminanceSensor");

class House {
    /** @type {object} */
    #people = {}; // TODO Rename persons
    /** @type {object} */
    #rooms = {};
    /** @type {IlluminanceSensor} */
    #illuminanceSensor;
    /** @type {Agent} */
    #houseAgent;
    /** @type {RoomAgent} */
    #lightAgent;
    /** @type {ShutterAgent} */
    #shutterAgent;

    constructor() {
        this.#illuminanceSensor = new IlluminanceSensor(
            "house-illuminance-sensor"
        );
    }

    get persons() {
        return this.people;
    }

    get people() {
        return this.#people;
    }

    get rooms() {
        return this.#rooms;
    }

    get illuminanceSensor() {
        return this.#illuminanceSensor;
    }

    get houseAgent() {
        return this.#houseAgent;
    }

    get lightAgent() {
        return this.#lightAgent;
    }

    get shutterAgent() {
        return this.#shutterAgent;
    }

    set persons(persons) {
        this.people = persons;
    }

    set people(people) {
        this.#people = people;
    }

    set rooms(rooms) {
        this.#rooms = rooms;
    }

    set houseAgent(houseAgent) {
        this.#houseAgent = houseAgent;
    }

    set lightAgent(lightAgent) {
        this.#lightAgent = lightAgent;
    }

    set shutterAgent(shutterAgent) {
        this.#shutterAgent = shutterAgent;
    }

    /**
     * Returns the room for the given ID.
     *
     * @param {string} roomId Desired room
     * @returns
     */
    getRoom(roomId) {
        if (!this.hasRoom(roomId)) {
            throw `Room with ID ${roomId} does not exist`;
        }
        return this.#rooms[roomId];
    }

    getPerson(personId) {
        if (!this.hasPerson(personId)) {
            throw `Person with ID ${personId} does not exist`;
        }
        return this.#people[personId];
    }

    hasRoom(roomId) {
        return this.#rooms.hasOwnProperty(roomId);
    }

    hasPerson(personId) {
        return this.#people.hasOwnProperty(personId);
    }

    /**
     * Moves a person from one room to another.
     * It is important that the start room has a direct path
     * to the destination.
     *
     * @param {string} person The person identifier
     * @param {string} from Identifer of the source room
     * @param {string} to Identifier of the destination room
     */
    movePersonTo(personId, sourceId, destinationId) {
        let person = this.getPerson(personId);
        let sourceRoom = this.getRoom(sourceId);
        let destinationRoom = this.getRoom(destinationId);
        if (
            !sourceRoom.hasPathToRoom(destinationId) &&
            !destinationRoom.hasPathToRoom(sourceId)
        ) {
            throw `There is no direct path from ${sourceId} to ${destinationId}.`;
        }
        if (!person.isInRoom(sourceId)) {
            throw `Person ${personId} is not in ${sourceId}`;
        }
        person.setLocation(destinationId);
        sourceRoom.removeResident(person);
        destinationRoom.addResident(person);
    }
}

module.exports = House;
