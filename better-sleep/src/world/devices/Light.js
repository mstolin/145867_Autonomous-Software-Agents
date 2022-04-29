const Observable = require('../../lib/utils/Observable')

const STATE_LIGHT_ON = 'on'
const STATE_LIGHT_STANDBY = 'standby'

class Light extends Observable {

    state = STATE_LIGHT_STANDBY
    brightness = 0
    temperature = 1700

    name

    constructor(name) {
        super({})
        this.name = name
    }

    /**
     * Max. Lumen is 800lm.
     * Value can't be less than 0.
     */
    set brightness(brightness) {
        if(this.state != STATE_LIGHT_ON) {
            console.warn(`${this.name} is not in state ${STATE_LIGHT_ON}`)
            return
        }

        if(brightness < 0 || brightness > 800) {
            console.warn('The max. Lumen value of this light is 800lm.')
        } else {
            this.set('brightness', brightness)
        }
    }

    /**
     * This light has a min. temperature of 1700K and
     * a max. value of 6500K.
     */
    set temperature(temperature) {
        if(this.state != STATE_LIGHT_ON) {
            console.warn(`${this.name} is not in state ${STATE_LIGHT_ON}`)
            return
        }

        if(temperature < 1700 || temperature > 6500) {
            console.warn('Temperature has a min. value of 1700K and 6500K')
        } else {
            this.set('temperature', temperature)
        }
    }

    turnOn() {
        this.set('state', STATE_LIGHT_ON)
        // TODO also set temp and brightness
    }

    turnOff() {
        this.set('state', STATE_LIGHT_STANDBY)
        // TODO also set temp and brightness
    }

}

module.exports = Light
