const Person = require('./Person')

test('Person.constructor', () => {
    let person = new Person('James')
    expect(person.name).toBe('James')
})
