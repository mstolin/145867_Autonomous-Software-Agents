const Clock = require('../utils/Clock.js')

class House {

    people
    rooms

    constructor(people, rooms) {
        this.people = people
        this.rooms = rooms

        Clock.startTimer()
        Clock.wallClock()
    }

    movePersonTo(person, from, to) {
        // Check if the person and the rooms exist
        if(this.people.hasOwnProperty(person) && this.rooms.hasOwnProperty(from) && this.rooms.hasOwnProperty(to)) {
            // Check if person is in start room
            if(this.people[person].location == from) {
                // can the person move to the desired room
                if(this.rooms[from].doors.includes(to) || this.rooms[to].doors.includes(from)) {
                    this.people[person].location = to
                    console.log(`${person} is now in ${to}.`)
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
