const Device = require("./Device");
const Clock = require("../utils/Clock");

class IlluminanceSensor extends Device {

  constructor(name) {
    super(name);

    // calculate room illuminence on init
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
    if (this.#isMorning(hour)) {
      return this.#getRandomArbitrary(0.25, 1);
    } else if (this.#isAfternoon(hour)) {
      return this.#getRandomArbitrary(0.5, 1);;
    } else {
      // evening
      return this.#getRandomArbitrary(0.1, 0.3);;
    }
  }

  #getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  
}

module.exports = IlluminanceSensor;
