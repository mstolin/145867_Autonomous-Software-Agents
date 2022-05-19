const BeliefSet = require("../../../../lib/bdi/BeliefSet");
const personIds = require("../../../world/persons/PersonIds");
const roomIds = require("../../../world/rooms/RoomIds");

/*let initialBeliefs = {
    'bedroom_light': 'off',
    'shutters': 'closed'
}
initialBeliefs[personIds.ID_PERSON_SANDRA] = roomIds.ID_ROOM_BEDROOM
initialBeliefs[personIds.ID_PERSON_BOB] = roomIds.ID_ROOM_BEDROOM

module.exports = new BeliefSet(initialBeliefs)*/

let initialBeliefs = new BeliefSet();
//initialBeliefs.addObject()

module.exports = initialBeliefs;
