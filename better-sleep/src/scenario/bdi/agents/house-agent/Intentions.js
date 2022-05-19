const Intention = require("../../../../lib/bdi/Intention");
const Clock = require("../../../../lib/utils/Clock");
const house = require("../../../world/House");
const roomIds = require("../../../world/rooms/RoomIds");
const { MorningLightGoal, MorningShuttersGoal } = require("./Goals");

/*class TurnOnLightInTheMorning extends Intention {
    static applicable(goal) {
        return goal instanceof MorningLightGoal
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
        return goal instanceof MorningShuttersGoal
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
}*/

/*class MorningIntention extends Intention {
    static applicable(goal) {
        return goal instanceof MorningLightGoal || goal instanceof MorningShuttersGoal
    }

    async *exec() {
        while(true) {
            yield Clock.global.notifyChange('mm')
            if(Clock.global.hh == 1 && Clock.global.mm == 0) {
                // Open shutters
                Object.keys(house.rooms)
                    .forEach(room => house.getRoom(room).shutters.forEach(shutter => shutter.open()))
                // Turn on light
                house.getRoom(roomIds.ID_ROOM_BEDROOM).mainLight.turnOn(500, 2000)
            }
        }
    }
}*/

/*module.exports = [
    MorningIntention
]*/
