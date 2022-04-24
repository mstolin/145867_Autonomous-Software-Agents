const Observable = require('./Observable')
const Clock = require('./Clock')

class House {

    peopleLocations
    people
    rooms

    /**
     * 
     * @param {object} people 
     * @param {object} rooms 
     * @param {object} defaultLocations
     */
    constructor(people, rooms, defaultLocations) {
        this.people = people
        this.rooms = rooms
        this.peopleLocations = new Observable(defaultLocations)

        Clock.startTimer()
        Clock.wallClock()
    }

    movePersonTo(person, from, to) {
        // Check if the person and the rooms exist
        if(this.people.hasOwnProperty(person) && this.rooms.hasOwnProperty(from) && this.rooms.hasOwnProperty(to)) {
            // Check if person is in start room
            if(this.peopleLocations[person] == from) {
                // can the person move to the desired room
                if(this.rooms[from].hasPathToRoom(to) || this.rooms[to].hasPathToRoom(from)) {
                    console.log('OK ALLES KLAR LAEUFT')
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
