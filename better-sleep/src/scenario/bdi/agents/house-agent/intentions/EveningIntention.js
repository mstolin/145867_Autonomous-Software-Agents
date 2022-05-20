const Intention = require("../../../../../lib/bdi/Intention");
const Clock = require("../../../../../lib/utils/Clock");
const house = require("../../../../world/House");
const roomIds = require("../../../../world/rooms/RoomIds");
const { EveningGoal } = require("../Goals");

/**
 * @agent EveningIntention
 * 
 * This intention is responsible to turn off all lights
 * and close all shutters in the evening, when the residents
 * are going to sleep.
 */
class EveningIntention extends Intention {
    static applicable(goal) {
        return goal instanceof EveningGoal;
    }

    *exec() {
        let hh = this.goal.parameters["hh"];
        let mm = this.goal.parameters["mm"];
        while (true) {
            yield;
            if (Clock.global.hh == hh && Clock.global.mm == mm) {
                // Turn off main light in bedroom, and close all shutters
                house.getRoom(roomIds.ID_ROOM_BEDROOM).mainLight.turnOff();
                Object.keys(house.rooms).forEach((id) => {
                    let room = house.getRoom(id);
                    room.shutters.forEach((shutter) => shutter.close());
                });
                break;
            }
        }
    }
}

module.exports = EveningIntention;
