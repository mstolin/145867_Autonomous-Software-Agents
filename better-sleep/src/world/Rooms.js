const Room = require('../classes/Room')

const ID_ROOM_FIRST_FLOOR = 'first_floor'
const ID_ROOM_LIVING_ROOM = 'living_room'
const ID_ROOM_KITCHEN = 'kitchen'
const ID_ROOM_BEDROOM = 'bedroom'
const ID_ROOM_GUESTROOM = 'guestroom'
const ID_ROOM_SECOND_FLOOR = 'second_floor'
const ID_ROOM_BATHROOM = 'bathroom'

// Lower floor
let firstFloor = new Room(
    'First Floor',
    [ID_ROOM_LIVING_ROOM, ID_ROOM_KITCHEN, ID_ROOM_FIRST_FLOOR],
    {},
    {}
)
let livingRoom = new Room(
    'Living Room',
    [ID_ROOM_KITCHEN, ID_ROOM_FIRST_FLOOR],
    {},
    {}
)
let kitchen = new Room(
    'Kitchen',
    [ID_ROOM_LIVING_ROOM, ID_ROOM_FIRST_FLOOR],
    {},
    {}
)
// Upper floor
let bedroom = new Room(
    'Bedroom',
    [ID_ROOM_SECOND_FLOOR],
    {},
    {}
)
let guestroom = new Room(
    'Guestroom',
    [ID_ROOM_SECOND_FLOOR],
    {},
    {}
)
let secondFloor = new Room(
    'Second Floor',
    [ID_ROOM_BEDROOM, ID_ROOM_BATHROOM, ID_ROOM_GUESTROOM, ID_ROOM_FIRST_FLOOR],
    {},
    {}
)
let bathroom = new Room(
    'Bathroom',
    [ID_ROOM_SECOND_FLOOR],
    {},
    {}
)

// exports identifier
module.exports.identifier = {
    ID_ROOM_FIRST_FLOOR,
    ID_ROOM_LIVING_ROOM,
    ID_ROOM_KITCHEN,
    ID_ROOM_BEDROOM,
    ID_ROOM_GUESTROOM,
    ID_ROOM_SECOND_FLOOR,
    ID_ROOM_BATHROOM
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
