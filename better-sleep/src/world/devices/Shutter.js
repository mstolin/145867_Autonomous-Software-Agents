const Observable = require('../../lib/Observable')

const STATE_SHUTTER_OPEN = 'open'
const STATE_SHUTTER_CLOSED = 'closed'

class Shutter extends Observable {

    state = STATE_SHUTTER_OPEN
    name

    constructor(name) {
        super({})
        this.name = name
    }

    /**
     * Opens the shutter by setting the state to STATE_SHUTTER_OPEN.
     */
    open() {
        if(this.state != STATE_SHUTTER_OPEN) {
            this.set('state', STATE_SHUTTER_OPEN)
        }
    }

    /**
     * Closes the shutter by setting the state to STATE_SHUTTER_CLOSED.
     */
    close() {
        if(this.state != STATE_SHUTTER_CLOSED) {
            this.set('state', STATE_SHUTTER_CLOSED)
        }
    }

}

module.exports = Shutter
