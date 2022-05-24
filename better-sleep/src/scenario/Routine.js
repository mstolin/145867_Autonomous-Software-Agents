const roomIds = require("./world/rooms/RoomIds");
const personIds = require("./world/persons/PersonIds");

// To simplify things, instead of starting the day at 7,
// we start at 1
function startRoutine(time, house) {
    /**
     * 1. Snadra and Bob wake up
     * 2.1. Sandra walks into the bathroom and needs 15min
     * 2.2. At the same time Bob walks into the Kitchen to make breakfast
     * 3.1. Sandra finishes in the bathroom and walks into the living room
     * 3.2. At the same time, Bob finishes in the Kitchen and walks into the living room as well to eat breakfast w Sandra
     * 4.1. Sandra and Bob finish eating breakfast, Sandra walks out of the house for work
     * 4.2. Bob walks into the kitchen to cleanup
     * 5. Bob walks into the bathroom to get ready
     * 6. Bob walks into the guest room to start working
     */

    if (time.dd == 0 && time.hh == 7 && time.mm == 0) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_BEDROOM,
            roomIds.ID_ROOM_SECOND_FLOOR
        );
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_BEDROOM,
            roomIds.ID_ROOM_SECOND_FLOOR
        );
    }

    if (time.dd == 0 && time.hh == 7 && time.mm == 1) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_SECOND_FLOOR,
            roomIds.ID_ROOM_BATHROOM
        );
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_SECOND_FLOOR,
            roomIds.ID_ROOM_FIRST_FLOOR
        );
    }

    if (time.dd == 0 && time.hh == 7 && time.mm == 2) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_FIRST_FLOOR,
            roomIds.ID_ROOM_KITCHEN
        );
    }

    if (time.dd == 0 && time.hh == 7 && time.mm == 15) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_BATHROOM,
            roomIds.ID_ROOM_SECOND_FLOOR
        );

        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_KITCHEN,
            roomIds.ID_ROOM_LIVING_ROOM
        );
    }

    if (time.dd == 00 && time.hh == 7 && time.mm == 16) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_SECOND_FLOOR,
            roomIds.ID_ROOM_FIRST_FLOOR
        );
    }

    if (time.dd == 00 && time.hh == 7 && time.mm == 17) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_FIRST_FLOOR,
            roomIds.ID_ROOM_LIVING_ROOM
        );
    }

    if (time.dd == 0 && time.hh == 7 && time.mm == 45) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_LIVING_ROOM,
            roomIds.ID_ROOM_FIRST_FLOOR
        );
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_LIVING_ROOM,
            roomIds.ID_ROOM_FIRST_FLOOR
        );
    }

    if (time.dd == 0 && time.hh == 7 && time.mm == 46) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_FIRST_FLOOR,
            roomIds.ID_ROOM_SECOND_FLOOR
        );
    }

    if (time.dd == 0 && time.hh == 7 && time.mm == 47) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_SECOND_FLOOR,
            roomIds.ID_ROOM_BATHROOM
        );
    }

    if (time.dd == 0 && time.hh == 7 && time.mm == 0) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_BATHROOM,
            roomIds.ID_ROOM_SECOND_FLOOR
        );
    }

    if (time.dd == 0 && time.hh == 7 && time.mm == 1) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_SECOND_FLOOR,
            roomIds.ID_ROOM_GUESTROOM
        );
    }
}

module.exports = startRoutine;
