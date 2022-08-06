const Light = require("./Light");
const LightSensor = require("./LightSensor");
const Shutter = require("./Shutter");
const MotionSensor = require("./MotionSensor");
const LightAgent = require("../bdi/LightAgent");
const ShutterAgent = require("../bdi/ShutterAgent");

class Room {
    /** @type {string} */
    #name;
    /** @type {LightSensor} */
    #lightSensor;
    /** @type {Light} */
    #mainLight;
    /** @type {Array<string>} */
    #doors = [];
    /** @type {Array<Shutter>} */
    #shutters = [];
    /** @type {MotionSensor} */
    #motionSensor;
    /** @type {LightAgent} */
    #lightAgent;
    /** @type {ShutterAgent} */
    #shutterAgent;

    /**
     * Constructs a new Room instance.
     *
     * @param {string} name
     * @param {Array<string>} doors
     * @param {int} numOfShutters
     */
    constructor(name, doors, numOfShutters) {
        this.#name = name;
        this.#doors = doors;
        this.#mainLight = new Light(`${this.#name}-main_light`);
        this.#lightSensor = new LightSensor(`${this.#name}-light_sensor`, this);
        this.#motionSensor = new MotionSensor(`${this.#name}-motion_sensor`);
        this.#initShutters(numOfShutters);
    }

    #initShutters(num) {
        for (let i = 0; i < num; i++) {
            let index = i + 1;
            this.#shutters.push(new Shutter(`${this.#name}-shutter_${index}`));
        }
    }

    get name() {
        return this.#name;
    }

    get mainLight() {
        return this.#mainLight;
    }

    get shutters() {
        return this.#shutters;
    }

    get lightSensor() {
        return this.#lightSensor;
    }

    get motionSensor() {
        return this.#motionSensor;
    }

    get lightAgent() {
        return this.#lightAgent;
    }

    get shutterAgent() {
        return this.#shutterAgent;
    }

    get agents() {
        return [this.#lightAgent, this.#shutterAgent];
    }

    /**
     * True if some resident is in the room.
     */
    get isOccupied() {
        return this.#motionSensor.get("isOccupied");
    }

    set lightAgent(lightAgent) {
        this.#lightAgent = lightAgent;
    }

    set shutterAgent(shutterAgent) {
        this.#shutterAgent = shutterAgent;
    }

    /**
     * Checks if the room has a direct path
     * to the given room.
     *
     * @param {string} roomId Destination room id
     * @returns {boolean} True if room has a direct path to the destination
     */
    hasPathToRoom(roomId) {
        return this.#doors.includes(roomId);
    }

    /**
     *
     * @param {Person} person
     */
    addResident(person) {
        this.#motionSensor.addResident(person.name);
    }

    /**
     *
     * @param {Person} person
     */
    removeResident(person) {
        this.#motionSensor.removeResident(person.name);
    }
}

module.exports = Room;
