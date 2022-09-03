const Device = require("./Device");
const Clock = require("../utils/Clock");

class OutdoorLightSensor extends Device {
    turnOn() {
        super.turnOn();
        this.set(
            "illuminence",
            this.#determineOutdoorIlluminence(Clock.global["hh"])
        );
        Clock.global.observe("hh", (hour) => {
            this.set("illuminence", this.#determineOutdoorIlluminence(hour));
        });
    }

    #isMorning = (hour) => hour >= 6 && hour < 12;
    #isAfternoon = (hour) => hour >= 12 && hour < 18;

    #determineOutdoorIlluminence(hour) {
        // These are totally random number to simulate illuminance change
        if (!this.#isMorning(hour) && !this.#isAfternoon(hour)) {
            // Its evening, so its dark
            return this.#getRandomArbitrary(0.1, 0.3);
        } else {
            // Its either afternoon or morning, so it can be cloudy or sunny
            return this.#getRandomArbitrary(0.31, 1);
        }
    }

    #getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
}

module.exports = OutdoorLightSensor;
