const Agent = require('../../../../lib/bdi/Agent4')
const intentions = require('./Intentions')
const beliefs = require('./Beliefs')

let houseAgent = new Agent('House Agent', beliefs)
// add all intentions
for(let intention of intentions) {
    //houseAgent.addIntention(intention)
    houseAgent.intentions.push(intention)
}

module.exports = houseAgent
