const Room = require('../classes/Room')
const Light = require('../classes/Light')
const Shutter = require('../classes/Shutter')

const ID_ROOM_FIRST_FLOOR = 'first_floor'
const ID_ROOM_LIVING_ROOM = 'living_room'
const ID_ROOM_KITCHEN = 'kitchen'
const ID_ROOM_BEDROOM = 'bedroom'
const ID_ROOM_GUESTROOM = 'guestroom'
const ID_ROOM_SECOND_FLOOR = 'second_floor'
const ID_ROOM_BATHROOM = 'bathroom'

const ID_LIGHT_MAIN = 'main-light'
const ID_LIGHT_SMALL_1 = 'small-light-1'
const ID_LIGHT_SMALL_2 = 'small-light-2'

// Light profiles, since most rooms have the same
let lightProfile1 = {}
lightProfile1[ID_LIGHT_MAIN] = new Light('Main Light')

let lightProfile2 = {}
lightProfile2[ID_LIGHT_MAIN] = new Light('Main Light')
lightProfile2[ID_LIGHT_SMALL_1] = new Light('Small Light 1')
lightProfile2[ID_LIGHT_SMALL_2] = new Light('Small Light 2')

// Lower floor
let firstFloor = new Room(
    'First Floor',
    [ID_ROOM_LIVING_ROOM, ID_ROOM_KITCHEN, ID_ROOM_FIRST_FLOOR],
    [new Shutter(''), new Shutter()],
    lightProfile1
)
let livingRoom = new Room(
    'Living Room',
    [ID_ROOM_KITCHEN, ID_ROOM_FIRST_FLOOR],
    [new Shutter(''), new Shutter()],
    lightProfile2
)
let kitchen = new Room(
    'Kitchen',
    [ID_ROOM_LIVING_ROOM, ID_ROOM_FIRST_FLOOR],
    [new Shutter(''), new Shutter()],
    lightProfile2
)
// Upper floor
let bedroom = new Room(
    'Bedroom',
    [ID_ROOM_SECOND_FLOOR],
    [new Shutter(''), new Shutter()],
    lightProfile2
)
let guestroom = new Room(
    'Guestroom',
    [ID_ROOM_SECOND_FLOOR],
    [new Shutter(''), new Shutter()],
    lightProfile2
)
let secondFloor = new Room(
    'Second Floor',
    [ID_ROOM_BEDROOM, ID_ROOM_BATHROOM, ID_ROOM_GUESTROOM, ID_ROOM_FIRST_FLOOR],
    [new Shutter(''), new Shutter()],
    lightProfile1
)
let bathroom = new Room(
    'Bathroom',
    [ID_ROOM_SECOND_FLOOR],
    [new Shutter(''), new Shutter()],
    lightProfile1
)

// exports identifier
module.exports.roomIds = {
    ID_ROOM_FIRST_FLOOR,
    ID_ROOM_LIVING_ROOM,
    ID_ROOM_KITCHEN,
    ID_ROOM_BEDROOM,
    ID_ROOM_GUESTROOM,
    ID_ROOM_SECOND_FLOOR,
    ID_ROOM_BATHROOM
}
module.exports.lightIds = {
    ID_LIGHT_MAIN,
    ID_LIGHT_SMALL_1,
    ID_LIGHT_SMALL_2
}
// exports rooms
module.exports.rooms = {}
module.exports.rooms[ID_ROOM_FIRST_FLOOR] = firstFloor
module.exports.rooms[ID_ROOM_LIVING_ROOM] = livingRoom
module.exports.rooms[ID_ROOM_KITCHEN] = kitchen
module.exports.rooms[ID_ROOM_BEDROOM] = bedroom
module.exports.rooms[ID_ROOM_GUESTROOM] = guestroom
module.exports.rooms[ID_ROOM_SECOND_FLOOR] = secondFloor
module.exports.rooms[ID_ROOM_BATHROOM] = bathroom
