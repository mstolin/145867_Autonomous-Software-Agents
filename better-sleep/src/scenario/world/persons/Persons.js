const Person = require("../../../lib/world/Person");
const ids = require("./PersonIds");

// TODO Rename to index.js

function initPersons() {
    let persons = {};
    for (const name of Object.values(ids)) {
        persons[name] = new Person(name);
    }
    return persons;
};

module.exports = { initPersons };
