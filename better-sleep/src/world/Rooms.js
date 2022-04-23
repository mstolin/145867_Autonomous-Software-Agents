const identifier = require('../utils/RoomIdentifier.js')

let kitchen = {name: 'Kitchen', doors: [identifier.LIVING_ROOM], windows: []}
let livingRoom = {name: 'Living Room', doors: [identifier.KITCHEN], windows: []}

module.exports[identifier.KITCHEN] = kitchen
module.exports[identifier.LIVING_ROOM] = livingRoom
