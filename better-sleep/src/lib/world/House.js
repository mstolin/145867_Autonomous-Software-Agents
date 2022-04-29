const Observable = require('./utils/Observable')

class House {

    /** @type {object} */
    #peopleLocations
    /** @type {object} */
    #people
    /** @type {object} */
    #rooms

    /**
     * Constructs a new House instance.
     * 
     * @param {object} people The people of this house 
     * @param {object} rooms All rooms of the house 
     * @param {object} defaultLocations The initial location of the people
     */
    constructor(people, rooms, defaultLocations) {
        this.#people = people
        this.#rooms = rooms
        this.#peopleLocations = new Observable(defaultLocations)
    }

    get people() {
        return this.#people
    }

    get rooms() {
        return this.#rooms
    }

    get locations() {
        return this.#peopleLocations
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
    movePersonTo(person, from, to) {
        // Check if the person and the rooms exist
        if(this.people.hasOwnProperty(person) && this.rooms.hasOwnProperty(from) && this.rooms.hasOwnProperty(to)) {
            // Check if person is in start room
            if(this.peopleLocations[person] == from) {
                // can the person move to the desired room
                if(this.rooms[from].hasPathToRoom(to) || this.rooms[to].hasPathToRoom(from)) {
                    this.peopleLocations.set(person, to)
                } else {
                    console.warn(`There is no direct way from ${from} to ${to}.`)
                }
            } else {
                console.warn(`${person} is currently not in ${from}.`)
            }
        } else {
            console.warn(`Either ${person} does not exist in people, or ${from} or ${to} do not exist in rooms.`)
        }
    }
    
}

module.exports = House
