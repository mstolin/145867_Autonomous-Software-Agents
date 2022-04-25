const Person = require('../classes/Person')

const ID_PERSON_SANDRA = 'sandra'
const ID_PERSON_BOB = 'bob'

let sandra = new Person('Sandra', null)
let bob = new Person('Bob', null)

// exports identifier
module.exports.personIds = {
    ID_PERSON_SANDRA,
    ID_PERSON_BOB
}

// exports persons
let persons = {}
persons[ID_PERSON_SANDRA] = sandra
persons[ID_PERSON_BOB] = bob
module.exports.persons = persons
