const Observable = require("../utils/Observable");

class Device extends Observable {
    static STATE_DEVICE_ON = "on";
    static STATE_DEVICE_OFF = "off";

    /** @type {string} */
    #name;

    constructor(name) {
        super({});
        this.#name = name;
        this.set("deviceState", Device.STATE_DEVICE_OFF);
    }

    get name() {
        return this.#name;
    }

    get isOn() {
        return this.deviceState == Device.STATE_DEVICE_ON;
    }

    get isOff() {
        return this.deviceState == Device.STATE_DEVICE_OFF;
    }

    turnOn() {
        this.set("deviceState", Device.STATE_DEVICE_ON);
    }

    turnOff() {
        this.set("deviceState", Device.STATE_DEVICE_OFF);
    }
}

module.exports = Device;
