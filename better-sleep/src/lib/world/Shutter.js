const Observable = require('../utils/Observable')

const STATE_SHUTTER_OPEN = 'open'
const STATE_SHUTTER_CLOSED = 'closed'

class Shutter extends Observable {

    /** @type {string} */
    #name

    constructor(name) {
        super({})
        this.#name = name
        this.defineProperty('state', STATE_SHUTTER_CLOSED)
    }

    get name() {
        return this.#name
    }

    get isOpen() {
        return this.state == STATE_SHUTTER_OPEN
    }

    get isClosed() {
        return this.state == STATE_SHUTTER_CLOSED
    }

    /**
     * Opens the shutter by setting the state to STATE_SHUTTER_OPEN.
     */
    open() {
        if(this.state == STATE_SHUTTER_OPEN) {
            throw(`${this.name} is already in state ${STATE_SHUTTER_OPEN}`)
        }
        this.set('state', STATE_SHUTTER_OPEN)
    }

    /**
     * Closes the shutter by setting the state to STATE_SHUTTER_CLOSED.
     */
    close() {
        if(this.state == STATE_SHUTTER_CLOSED) {
            throw(`${this.name} is already in state ${STATE_SHUTTER_CLOSED}`)
        }
        this.set('state', STATE_SHUTTER_CLOSED)
    }

}

module.exports = Shutter
