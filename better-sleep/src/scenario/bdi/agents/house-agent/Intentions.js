const Intention = require("../../../../lib/bdi/Intention");
const Clock = require("../../../../lib/utils/Clock");
const house = require("../../../world/House");
const roomIds = require("../../../world/rooms/RoomIds");
const { MorningGoal, EveningGoal } = require("./Goals");

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

module.exports = [MorningIntention, EveningIntention];
