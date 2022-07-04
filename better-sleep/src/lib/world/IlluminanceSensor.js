const Device = require("./Device");
const Clock = require("../utils/Clock")

class IlluminanceSensor extends Device {
    #room;

    constructor(name, room) {
        super(name);
        this.#room = room;

        // calculate room illuminence on init
        this.set("illuminence", this.#determineOutdoorIlluminence(Clock.global["hh"]));
        Clock.global.observe("hh", (hour) => {
            this.set("illuminence", this.#determineOutdoorIlluminence(hour));
        });
    }

    #isMorning = (hour) => hour >=6 && hour < 12;

    #isAfternoon = (hour) => hour >= 12 && hour < 18;

    #determineOutdoorIlluminence(hour) {
        if (this.#isMorning(hour)) {
            return 1;
        } else if (this.#isAfternoon(hour)) {
            return 2;
        } else {
            // evening
            return 3;
        }
    }
}

module.exports = IlluminanceSensor;
