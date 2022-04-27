const ids = require('./PersonIds')
const Sandra = require('./Sandra')
const Bob = require('./Bob')

let persons = {}
persons[ids.ID_PERSON_SANDRA] = Sandra
persons[ids.ID_PERSON_BOB] = Bob

module.exports = persons
