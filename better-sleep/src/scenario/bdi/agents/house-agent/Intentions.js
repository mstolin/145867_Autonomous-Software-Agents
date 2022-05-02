const Intention = require('../../../../lib/bdi/Intention')
const Clock = require('../../../../lib/utils/Clock')
const house = require('../../../world/House')
const roomIds = require('../../../world/rooms/RoomIds')

class TurnOnLightInTheMorning extends Intention {
    static applicable(goal) {
        return goal == 'morningLightGoal'
    }
    *exec() {
        Clock.global.observe('mm', () => {
            let time = Clock.global
            if(time.hh == 1 && time.mm == 0) {
                house.getRoom(roomIds.ID_ROOM_BEDROOM).mainLight.turnOn(500, 2000)
            }
        })
    }
}

class OpenShutters extends Intention {
    static applicable(goal) {
        return goal == 'morningShuttersGoal'
    }
    *exec() {
        Clock.global.observe('mm', () => {
            let time = Clock.global
            if(time.hh == 1 && time.mm == 0) {
                // Open all shutters
                Object.keys(house.rooms)
                    .forEach(room => house.getRoom(room).shutters.forEach(shutter => shutter.open()))
            }
        })
    }
}

module.exports = [
    TurnOnLightInTheMorning,
    OpenShutters
]
