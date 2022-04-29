const Room = require('./Room')

test('Room.constructor', () => {
    /*let shutters = {
        '01': new Shutter('Test')
    }*/
    let room = new Room('Room 43', ['kitchen'], {}, {})
    expect(room.name).toBe('Room 43')
})

test('Room.hasPathToRoom', () => {
    let room = new Room('Room 43', ['kitchen'], {}, {})
    expect(room.hasPathToRoom('kitchen')).toBe(true)
    expect(room.hasPathToRoom('bathroom')).toBe(false)
})
