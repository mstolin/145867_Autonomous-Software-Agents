const Observable = require('../utils/Observable.js')
const identifier = require('../utils/RoomIdentifier.js')

let sandra = new Observable({name: 'Sandra', location: identifier.LIVING_ROOM})
sandra.observe('location', (v, _) => console.log(`Room: ${v}`))

let bob = new Observable({name: 'Bob', location: identifier.LIVING_ROOM})
bob.observe('location', (v, _) => console.log(`Room: ${v}`))

module.exports.sandra = sandra
module.exports.bob = bob
