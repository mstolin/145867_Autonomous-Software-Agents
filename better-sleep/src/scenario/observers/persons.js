const { personIds } = require("../world/persons");
const Logger = require("../../lib/utils/Logger");

/**
 * This function observes the location of all
 * residents.
 *
 * @param {House} house
 */
function observePersonLocations(house) {
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
}

module.exports = { observePersonLocations };
