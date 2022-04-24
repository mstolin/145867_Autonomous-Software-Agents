class Room {

    name
    doors = []
    windows = {}
    lights = {}

    constructor(name, doors, windows, lights) {
        this.name = name
        this.doors = doors
        this.windows = windows
        this.lights = lights
    }

    hasPathToRoom(roomId) {
        return this.doors.includes(roomId)
    }

}

module.exports = Room
