const House = require('./House')
const Room = require('./Room')
const Light = require('./Light')
const Shutter = require('./Shutter')
const Person = require('./Person')

let room1 = new Room(
    'Room1',
    ['room2'],
    {'shutter1': new Shutter('shutter')},
    {'light1': new Light('light')}
)
let room2 = new Room(
    'Room2',
    ['room1', 'room3'],
    {'shutter1': new Shutter('shutter')},
    {'light1': new Light('light')}
)
let room3 = new Room(
    'Room3',
    ['room2'],
    {'shutter1': new Shutter('shutter')},
    {'light1': new Light('light')}
)
let person1 = new Person('Person1', 'room1')

let rooms = {
    'room1': room1,
    'room2': room2,
    'room3': room3
}
let people = {
    'person1': person1
}

test('House.constructor', () => {
    let house = new House(people, rooms)
    expect(house.people).toBe(people)
    expect(house.rooms).toBe(rooms)
})

test('House.getRoom', () => {
    let house = new House(people, rooms)
    expect(house.getRoom('room1')).toBe(room1)
    expect(house.getRoom('room2')).toBe(room2)
    expect(() => house.getRoom('room4')).toThrow()
})

test('House.hasRoom', () => {
    let house = new House(people, rooms)
    expect(house.hasRoom('room1')).toBeTruthy()
    expect(house.hasRoom('room2')).toBeTruthy()
    expect(house.hasRoom('room4')).toBeFalsy()
})

test('House.getPerson', () => {
    let house = new House(people, rooms)
    expect(house.getPerson('person1')).toBe(person1)
    expect(() => house.getPerson('person2')).toThrow()
})

test('House.hasPerson', () => {
    let house = new House(people, rooms)
    expect(house.hasPerson('person1')).toBeTruthy()
    expect(house.hasPerson('person2')).toBeFalsy()
})

test('House.movePersonTo', () => {
    let house = new House(people, rooms)

    // person does not exist => throw
    expect(() => house.movePersonTo('person2', 'room1', 'room2')).toThrow()
    // source does not exist => throw
    expect(() => house.movePersonTo('person1', 'room4', 'room2')).toThrow()
    // destination does not exist => throw
    expect(() => house.movePersonTo('person1', 'room1', 'room4')).toThrow()
    // no direct path => throw
    expect(() => house.movePersonTo('person1', 'room1', 'room3')).toThrow()
    // person is not in source => throw
    expect(() => house.movePersonTo('person1', 'room2', 'room1')).toThrow()
    // move from source to source => throw
    expect(() => house.movePersonTo('person1', 'room1', 'room1')).toThrow()

    expect(person1.location).toBe('room1')
    house.movePersonTo('person1', 'room1', 'room2')
    expect(person1.location).toBe('room2')
})
