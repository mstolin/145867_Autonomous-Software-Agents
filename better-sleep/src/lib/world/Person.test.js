const Person = require('./Person')

test('Person.constructor', () => {
    let person = new Person('James', 'KITCHEN')
    expect(person.name).toBe('James')
    expect(person.location).toBe('KITCHEN')
})

test('Person.setLocation', () => {
    let person = new Person('James', 'KITCHEN')

    person.setLocation('BEDROOM')
    expect(person.location).toBe('BEDROOM')

    // Already in bedroom
    expect(() => person.setLocation('BEDROOM')).toThrow()
})

test('Person.isInRoom', () => {
    let person = new Person('James', 'KITCHEN')
    expect(person.isInRoom('KITCHEN')).toBeTruthy()
    expect(person.isInRoom('BEDROOM')).toBeFalsy()
})
