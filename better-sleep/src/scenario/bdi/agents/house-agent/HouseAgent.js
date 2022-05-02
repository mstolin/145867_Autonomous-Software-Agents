const Agent = require('../../../../lib/bdi/Agent')
const intentions = require('./Intentions')
const beliefs = require('./Beliefs')

let houseAgent = new Agent('House Agent', beliefs)
// add all intentions
for(let intention of intentions) {
    houseAgent.addIntention(intention)
}

module.exports = houseAgent
