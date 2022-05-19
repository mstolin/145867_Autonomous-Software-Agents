const Device = require("./Device");

class Light extends Device {
    constructor(name) {
        super(name);
        this.set("brightness", 0);
        this.set("temperature", 0);
    }

    /**
     * Max. Lumen is 800lm.
     * Value can't be less than 0.
     *
     * @param {number} brightness The desired brightness
     */
    setBrightness(brightness) {
        if (this.isOff) {
            throw `${this.name} is off`;
        }
        if (brightness < 1 || brightness > 800) {
            throw "The max. Lumen value of this light is 800lm and it can't be lower than 1lm.";
        }
        this.set("brightness", brightness);
    }

    /**
     * This light has a min. temperature of 1700K and
     * a max. value of 6500K.
     *
     * @param {number} temperature The desired temperature
     */
    setTemperature(temperature) {
        if (this.isOff) {
            throw `${this.name} is off`;
        }
        if (temperature < 1700 || temperature > 6500) {
            throw "Temperature has a min. value of 1700K and 6500K";
        }
        this.set("temperature", temperature);
    }

    /**
     * Turn the lights state to on.
     * Additionally, it sets the brightness and
     * tmperature to an initial state.
     *
     * @param {number} brightness
     * @param {number} temperature
     */
    turnOn(brightness, temperature) {
        if (this.isOn) {
            throw `${this.name} is off`;
        }

        try {
            this.set("deviceState", Device.STATE_DEVICE_ON);
            this.setBrightness(brightness);
            this.setTemperature(temperature);
        } catch (err) {
            this.set("deviceState", Device.STATE_DEVICE_OFF);
            throw err;
        }
    }

    /**
     * Sets the lights state to off.
     * Additionally, it updates the brightness and
     * temperature to 0.
     */
    turnOff() {
        if (this.isOff) {
            throw `${this.name} is already off`;
        }

        this.set("deviceState", Device.STATE_DEVICE_OFF);
        // no need to use designated setter
        // If the light if off, everything has to be 0 anyway
        this.set("brightness", 0);
        this.set("temperature", 0);
    }
}

module.exports = Light;
