const Intention = require("../../../../../lib/bdi/Intention");
const Clock = require("../../../../../lib/utils/Clock");
const house = require("../../../../world/House");
const roomIds = require("../../../../world/rooms/RoomIds");
const { MorningGoal } = require("../Goals");

/**
 * @class MorningIntention
 * 
 * This intention is responsible to turn on the 
 * light (only bedroom) and open all shutters
 * in the morning to wake up all residents.
 */
class MorningIntention extends Intention {
    static applicable(goal) {
        return goal instanceof MorningGoal;
    }

    *exec() {
        let hh = this.goal.parameters["hh"];
        let mm = this.goal.parameters["mm"];
        while (true) {
            yield;
            if (Clock.global.hh == hh && Clock.global.mm == mm) {
                // Turn on main light in bedroom, and open all shutters
                house.getRoom(roomIds.ID_ROOM_BEDROOM).mainLight.turnOn();
                Object.keys(house.rooms).forEach((id) => {
                    let room = house.getRoom(id);
                    room.shutters.forEach((shutter) => shutter.open());
                });
                break;
            }
        }
    }
}

module.exports = MorningIntention;
