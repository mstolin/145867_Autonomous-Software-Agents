const Observable = require('../utils/Observable')

const STATE_LIGHT_ON = 'on'
const STATE_LIGHT_OFF = 'off'

class Light extends Observable {

    /** @type {string} */
    #name

    constructor(name) {
        super({})
        this.defineProperty('state', STATE_LIGHT_OFF)
        this.defineProperty('brightness', 0)
        this.defineProperty('temperature', 0)
        this.#name = name
    }

    get name() {
        return this.#name
    }

    /**
     * Max. Lumen is 800lm.
     * Value can't be less than 0.
     */
    setBrightness(brightness) {
        if(this.state != STATE_LIGHT_ON) {
            throw(`${this.#name} is not in state ${STATE_LIGHT_ON}`)
        }
        if(brightness < 1 || brightness > 800) {
            throw('The max. Lumen value of this light is 800lm and it can\'t be lower than 1lm.')
        }
        this.set('brightness', brightness)
    }

    /**
     * This light has a min. temperature of 1700K and
     * a max. value of 6500K.
     */
    setTemperature(temperature) {
        if(this.state != STATE_LIGHT_ON) {
            throw(`${this.#name} is not in state ${STATE_LIGHT_ON}`)
        }
        if(temperature < 1700 || temperature > 6500) {
            throw('Temperature has a min. value of 1700K and 6500K')
        }
        this.set('temperature', temperature)
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
        if(this.state == STATE_LIGHT_ON) {
            throw(`${this.#name} is already in state ${STATE_LIGHT_ON}`)
        }

        try {
            this.set('state', STATE_LIGHT_ON)
            this.setBrightness(brightness)
            this.setTemperature(temperature)
        } catch(err) {
            this.set('state', STATE_LIGHT_OFF)
            throw(err)
        }
    }

    /**
     * Sets the lights state to off.
     * Additionally, it updates the brightness and
     * temperature to 0.
     */
    turnOff() {
        if(this.state == STATE_LIGHT_OFF) {
            throw(`${this.#name} is already in state ${STATE_LIGHT_OFF}`)
        }

        this.set('state', STATE_LIGHT_OFF)
        // no need to use designated setter
        // If the light if off, everything has to be 0 anyway
        this.set('brightness', 0)
        this.set('temperature', 0) 
    }

}

module.exports = Light
