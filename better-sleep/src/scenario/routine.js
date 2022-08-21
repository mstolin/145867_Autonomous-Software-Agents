const { roomIds } = require("./world/rooms");
const { personIds } = require("./world/persons");

/**
 * This function executes the routine of all
 * residents. It will move the residents between
 * different rooms, depending on the given time.
 *
 * @param {Object<string, int>}} time
 * @param {House} house
 */
function executeRoutine(time, house) {
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

    if (time.hh == 7 && time.mm == 2) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_BEDROOM,
            roomIds.ID_ROOM_UPPER_FLOOR
        );
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_BEDROOM,
            roomIds.ID_ROOM_UPPER_FLOOR
        );
    }

    if (time.hh == 7 && time.mm == 3) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_UPPER_FLOOR,
            roomIds.ID_ROOM_BATHROOM
        );
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_UPPER_FLOOR,
            roomIds.ID_ROOM_LOWER_FLOOR
        );
    }

    if (time.hh == 7 && time.mm == 5) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_LOWER_FLOOR,
            roomIds.ID_ROOM_KITCHEN
        );
    }

    if (time.hh == 7 && time.mm == 20) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_BATHROOM,
            roomIds.ID_ROOM_UPPER_FLOOR
        );

        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_KITCHEN,
            roomIds.ID_ROOM_LIVING_ROOM
        );
    }

    if (time.hh == 7 && time.mm == 22) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_UPPER_FLOOR,
            roomIds.ID_ROOM_LOWER_FLOOR
        );
    }

    if (time.hh == 7 && time.mm == 24) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_LOWER_FLOOR,
            roomIds.ID_ROOM_LIVING_ROOM
        );
    }

    if (time.hh == 7 && time.mm == 45) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_LIVING_ROOM,
            roomIds.ID_ROOM_LOWER_FLOOR
        );
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_LIVING_ROOM,
            roomIds.ID_ROOM_LOWER_FLOOR
        );
    }

    if (time.hh == 7 && time.mm == 47) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_LOWER_FLOOR,
            roomIds.ID_ROOM_UPPER_FLOOR
        );
    }

    if (time.hh == 7 && time.mm == 49) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_UPPER_FLOOR,
            roomIds.ID_ROOM_BATHROOM
        );
    }

    if (time.hh == 8 && time.mm == 0) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_BATHROOM,
            roomIds.ID_ROOM_UPPER_FLOOR
        );
    }

    if (time.hh == 8 && time.mm == 2) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_UPPER_FLOOR,
            roomIds.ID_ROOM_GUESTROOM
        );
    }

    if (time.hh == 12 && time.mm == 0) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_GUESTROOM,
            roomIds.ID_ROOM_UPPER_FLOOR
        );
    }

    if (time.hh == 12 && time.mm == 2) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_UPPER_FLOOR,
            roomIds.ID_ROOM_LOWER_FLOOR
        );
    }

    if (time.hh == 12 && time.mm == 4) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_LOWER_FLOOR,
            roomIds.ID_ROOM_KITCHEN
        );
    }

    if (time.hh == 12 && time.mm == 10) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_KITCHEN,
            roomIds.ID_ROOM_LIVING_ROOM
        );
    }

    if (time.hh == 12 && time.mm == 50) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_LIVING_ROOM,
            roomIds.ID_ROOM_KITCHEN
        );
    }

    if (time.hh == 12 && time.mm == 55) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_KITCHEN,
            roomIds.ID_ROOM_LOWER_FLOOR
        );
    }

    if (time.hh == 12 && time.mm == 57) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_LOWER_FLOOR,
            roomIds.ID_ROOM_UPPER_FLOOR
        );
    }

    if (time.hh == 12 && time.mm == 59) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_UPPER_FLOOR,
            roomIds.ID_ROOM_GUESTROOM
        );
    }

    if (time.hh == 14 && time.mm == 00) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_GUESTROOM,
            roomIds.ID_ROOM_UPPER_FLOOR
        );
    }

    if (time.hh == 14 && time.mm == 3) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_UPPER_FLOOR,
            roomIds.ID_ROOM_BATHROOM
        );
    }

    if (time.hh == 14 && time.mm == 10) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_BATHROOM,
            roomIds.ID_ROOM_UPPER_FLOOR
        );
    }

    if (time.hh == 14 && time.mm == 13) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_UPPER_FLOOR,
            roomIds.ID_ROOM_GUESTROOM
        );
    }

    if (time.hh == 18 && time.mm == 0) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_LOWER_FLOOR,
            roomIds.ID_ROOM_LIVING_ROOM
        );
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_GUESTROOM,
            roomIds.ID_ROOM_UPPER_FLOOR
        );
    }

    if (time.hh == 18 && time.mm == 2) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_UPPER_FLOOR,
            roomIds.ID_ROOM_LOWER_FLOOR
        );
    }

    if (time.hh == 18 && time.mm == 4) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_LOWER_FLOOR,
            roomIds.ID_ROOM_KITCHEN
        );
    }

    if (time.hh == 18 && time.mm == 30) {
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_KITCHEN,
            roomIds.ID_ROOM_LIVING_ROOM
        );
    }

    if (time.hh == 22 && time.mm == 0) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_LIVING_ROOM,
            roomIds.ID_ROOM_LOWER_FLOOR
        );
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_LIVING_ROOM,
            roomIds.ID_ROOM_LOWER_FLOOR
        );
    }

    if (time.hh == 22 && time.mm == 2) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_LOWER_FLOOR,
            roomIds.ID_ROOM_UPPER_FLOOR
        );
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_LOWER_FLOOR,
            roomIds.ID_ROOM_UPPER_FLOOR
        );
    }

    if (time.hh == 22 && time.mm == 4) {
        house.movePersonTo(
            personIds.ID_PERSON_SANDRA,
            roomIds.ID_ROOM_UPPER_FLOOR,
            roomIds.ID_ROOM_BEDROOM
        );
        house.movePersonTo(
            personIds.ID_PERSON_BOB,
            roomIds.ID_ROOM_UPPER_FLOOR,
            roomIds.ID_ROOM_BEDROOM
        );
    }
}

module.exports = { executeRoutine };
