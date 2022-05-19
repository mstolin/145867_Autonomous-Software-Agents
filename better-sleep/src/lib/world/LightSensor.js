const Device = require("./Device");

class LightSensor extends Device {
    constructor(name, light) {
        super(name);

        this.set(
            "roomIlluminence",
            this.#calculateRoomIlluminence(light.brightness)
        );
        light.observe("brightness", (brightness) =>
            this.#calculateRoomIlluminence(brightness)
        );
    }

    #calculateRoomIlluminence(brightness) {
        return 5;
    }
}

module.exports = LightSensor;
