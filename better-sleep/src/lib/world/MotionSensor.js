const Device = require("./Device");

/**
 * The MotionSensor observes the movements
 * of its room and updates its status,
 * according if a resident is in a room or not.
 * 
 * @class
 */
class MotionSensor extends Device {
    #residents = [];

    /**
     * Constructs an instance of MotionSensor.
     * 
     * @param {string} name 
     */
    constructor(name) {
        super(name);
        this.#updateStatus();
    }

    /**
     * Updates the occupation status of the room.
     */
    #updateStatus() {
        let isOccupied = this.#residents.length > 0;
        this.set("isOccupied", isOccupied)
    }

    /**
     * Updates the resident history.
     * 
     * @param {string} id Resident id
     */
    addResident(id) {
        this.#residents.push(id);
        this.#updateStatus();
    }

    /**
     * Removes the resident from the 
     * history.
     * 
     * @param {string} id Resident id
     */
    removeResident(id) {
        let index = this.#residents.indexOf(id);
        if (index >= 0) {
            this.#residents.splice(index, 1);
            this.#updateStatus();
        }
    }
}

module.exports = MotionSensor;
