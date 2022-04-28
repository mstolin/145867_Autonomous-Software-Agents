class Room {

    name
    mainLight
    doors = []
    windows = {}
    smallLights = {}

    constructor(name, doors, shutters, smallLights) {
        this.name = name
        this.doors = doors
        this.shutter = shutters
        this.smallLights = smallLights
    }

    hasPathToRoom(roomId) {
        return this.doors.includes(roomId)
    }

    getSmallLight(id) {
        return this.smallLights[id]
    }

}

module.exports = Room
