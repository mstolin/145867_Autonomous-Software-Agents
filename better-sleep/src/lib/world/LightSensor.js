const Device = require("./Device");

class LightSensor extends Device {
    #room;

    constructor(name, room) {
        super(name);
        this.#room = room;

        // calculate room illuminence on init
        this.set("roomIlluminence", this.#calculateRoomIlluminence());

        // observe the main light
        this.#room.mainLight.observe("brightness", (_) =>
            this.#updateRoomIlluminence()
        );
        // observe the shutters
        this.#room.shutters.forEach((shutter) =>
            shutter.observe("state", (_) => this.#updateRoomIlluminence())
        );
    }

    #updateRoomIlluminence() {
        let illuminence = this.#calculateRoomIlluminence();
        this.set("roomIlluminence", illuminence);
    }

    #calculateRoomIlluminence() {
        let mainLightbrightness = this.#room.mainLight.brightness;
        let openShutters = this.#room.shutters.filter(
            (shutter) => shutter.isOpen
        ).length;
        let shutterBrightness = openShutters * 500;
        return mainLightbrightness + shutterBrightness;
    }
}

module.exports = LightSensor;
