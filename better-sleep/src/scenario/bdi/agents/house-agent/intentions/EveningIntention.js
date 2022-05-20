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

    /**
     * Close all given shutters.
     */
    #closeAllShutters(shutters) {
        for (const shutter of shutters) {
            shutter.close();
        }
    }

    *exec() {
        let hh = this.goal.parameters["hh"];
        let mm = this.goal.parameters["mm"];
        while (true) {
            yield;
            if (Clock.global.hh == hh && Clock.global.mm == mm) {
                for (const room of Object.values(house.rooms)) {
                    // turn of all lights
                    room.mainLight.turnOff();
                    this.#closeAllShutters(room.shutters);
                }
                break;
            }
        }
    }
}

module.exports = EveningIntention;
