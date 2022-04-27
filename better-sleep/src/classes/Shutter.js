const Observable = require('./Observable')

const STATE_SHUTTER_OPEN = 'open'
const STATE_SHUTTER_CLOSED = 'closed'

class Shutter extends Observable {

    state = STATE_SHUTTER_OPEN
    name

    constructor(name) {
        super({})
        this.name = name
    }

    open() {
        if(this.state != STATE_SHUTTER_OPEN) {
            this.set('state', STATE_SHUTTER_OPEN)
        }
    }

    close() {
        if(this.state != STATE_SHUTTER_CLOSED) {
            this.set('state', STATE_SHUTTER_CLOSED)
        }
    }

}
