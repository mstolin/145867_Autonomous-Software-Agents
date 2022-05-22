class House {
    /** @type {object} */
    #people;
    /** @type {object} */
    #rooms;

    /**
     * Constructs a new House instance.
     *
     * @param {object} people The people of this house
     * @param {object} rooms All rooms of the house
     */
    constructor(people, rooms) {
        this.#people = people;
        this.#rooms = rooms;
    }

    get people() {
        return this.#people;
    }

    get rooms() {
        return this.#rooms;
    }

    /**
     * Returns the room for the given ID.
     *
     * @param {string} roomId Desired room
     * @returns
     */
    getRoom(roomId) {
        if (!this.hasRoom(roomId)) {
            throw `Room with ID ${roomId} does not exist`;
        }
        return this.#rooms[roomId];
    }

    getPerson(personId) {
        if (!this.hasPerson(personId)) {
            throw `Person with ID ${personId} does not exist`;
        }
        return this.#people[personId];
    }

    hasRoom(roomId) {
        return this.#rooms.hasOwnProperty(roomId);
    }

    hasPerson(personId) {
        return this.#people.hasOwnProperty(personId);
    }

    /**
     * Moves a person from one room to another.
     * It is important that the start room has a direct path
     * to the destination.
     *
     * @param {string} person The person identifier
     * @param {string} from Identifer of the source room
     * @param {string} to Identifier of the destination room
     */
    movePersonTo(personId, sourceId, destinationId) {
        let person = this.getPerson(personId);
        let sourceRoom = this.getRoom(sourceId);
        let destinationRoom = this.getRoom(destinationId);
        if (
            !sourceRoom.hasPathToRoom(destinationId) &&
            !destinationRoom.hasPathToRoom(sourceId)
        ) {
            throw `There is no direct path from ${sourceId} to ${destinationId}.`;
        }
        if (!person.isInRoom(sourceId)) {
            throw `Person ${personId} is not in ${sourceId}`;
        }
        person.setLocation(destinationId);
        sourceRoom.removeResident(personId);
        destinationRoom.addResident(personId);
    }
}

module.exports = House;
