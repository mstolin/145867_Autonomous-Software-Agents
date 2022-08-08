const Person = require("../../../lib/world/Person");
const personIds = require("./personIds");

/**
 * Initiates instances of all wanted
 * persons.
 *
 * @returns {Objects<string, Person>}
 */
function initPersons() {
    let persons = {};
    for (const name of Object.values(personIds)) {
        persons[name] = new Person(name);
    }
    return persons;
}

module.exports = { initPersons, personIds };
