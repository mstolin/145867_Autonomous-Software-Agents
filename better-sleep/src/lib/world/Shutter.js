const Device = require("./Device");

const STATE_SHUTTER_OPEN = "open";
const STATE_SHUTTER_HALFWAYOPEN = "halfwayOpen";
const STATE_SHUTTER_CLOSED = "closed";

class Shutter extends Device {
    constructor(name) {
        super(name);
        this.set("state", STATE_SHUTTER_CLOSED);
    }

    get isOpen() {
        return this.state == STATE_SHUTTER_OPEN;
    }

    get isHalfwayOpen() {
        return this.state == STATE_SHUTTER_HALFWAYOPEN;
    }

    get isClosed() {
        return this.state == STATE_SHUTTER_CLOSED;
    }

    /**
     * Opens the shutter by setting the state to STATE_SHUTTER_FULLYOPEN.
     */
    open() {
        if (this.isOff) {
            throw `${this.name} is off`;
        }
        if (this.isOpen) {
            throw `${this.name} is already in state ${STATE_SHUTTER_OPEN}`;
        }
        this.set("state", STATE_SHUTTER_OPEN);
    }

    /**
     * Opens the shutter by setting the state to STATE_SHUTTER_HALFWAYOPEN.
     */
     halfwayOpen() {
        if (this.isOff) {
            throw `${this.name} is off`;
        }
        if (this.isHalfwayOpen) {
            throw `${this.name} is already in state ${STATE_SHUTTER_HALFWAYOPEN}`;
        }
        this.set("state", STATE_SHUTTER_HALFWAYOPEN);
    }

    /**
     * Closes the shutter by setting the state to STATE_SHUTTER_CLOSED.
     */
    close() {
        if (this.isOff) {
            throw `${this.name} is off`;
        }
        if (this.isClosed) {
            throw `${this.name} is already in state ${STATE_SHUTTER_CLOSED}`;
        }
        this.set("state", STATE_SHUTTER_CLOSED);
    }

    turnOff() {
        super.turnOn();
        this.close();
    }
}

module.exports = Shutter;
