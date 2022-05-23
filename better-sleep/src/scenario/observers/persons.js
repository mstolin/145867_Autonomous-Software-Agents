const house = require("../world/House");
const personIds = require("../world/persons/PersonIds");
const Logger = require("../../lib/utils/Logger");

const observeAllPersons = () => {
    // Observe the locations
    house
        .getPerson(personIds.ID_PERSON_SANDRA)
        .observe("location", (v, _) =>
            Logger.prefix(personIds.ID_PERSON_SANDRA).log(`Has entered ${v}`)
        );
    house
        .getPerson(personIds.ID_PERSON_BOB)
        .observe("location", (v, _) =>
            Logger.prefix(personIds.ID_PERSON_BOB).log(`Has entered ${v}`)
        );
};

module.exports = observeAllPersons;
