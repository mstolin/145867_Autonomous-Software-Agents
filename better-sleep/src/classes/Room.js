class Room {

    name
    doors = []
    windows = {}
    lights = {}

    constructor(name, doors, shutters, lights) {
        this.name = name
        this.doors = doors
        this.shutter = shutters
        this.lights = lights
    }

    hasPathToRoom(roomId) {
        return this.doors.includes(roomId)
    }

}

module.exports = Room
