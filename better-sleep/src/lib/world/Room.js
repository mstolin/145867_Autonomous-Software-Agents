const Light = require("./Light");
const LightSensor = require("./LightSensor");
const Shutter = require("./Shutter");

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

    /**
     * Constructs a new Room instance.
     *
     * @param {string} name
     * @param {Array<string>} doors
     * @param {int} numOfShutters
     */
    constructor(name, doors, numOfShutters) {
        this.#name = `Room-${name}`;
        this.#doors = doors;
        this.#mainLight = new Light(`${this.#name}-MainLight`);
        this.#lightSensor = new LightSensor(
            `${this.#name}-LightSensor`,
            this
        );
        this.#initShutters(numOfShutters);
    }

    #initShutters(num) {
        for (let i = 0; i < num; i++) {
            let index = i + 1;
            this.#shutters.push(new Shutter(`${this.#name}-Shutter-${index}`));
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
}

module.exports = Room;
