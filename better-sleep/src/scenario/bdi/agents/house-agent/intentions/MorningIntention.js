const Intention = require("../../../../../lib/bdi/Intention");
const Clock = require("../../../../../lib/utils/Clock");
const house = require("../../../../world/House");
const roomIds = require("../../../../world/rooms/RoomIds");
const roomAgents = require("../../room-agent");
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

    /**
     * Turns on the main light in the bedroom.
     */
    #turnOnBedroomLight() {
        try {
            house.getRoom(roomIds.ID_ROOM_BEDROOM).mainLight.turnOn();
        } catch (err) {
            this.log(err);
        }
    }

    /**
     * Opens all shutters of the house.
     */
    #openAllShutters() {
        Object.keys(house.rooms).forEach((id) => {
            let room = house.getRoom(id);
            room.shutters.forEach((shutter) => {
                try {
                    shutter.open();
                } catch (err) {
                    this.log(err);
                }
            });
        });
    }

    /**
     * Update all room agents to belief that the daytime
     * is morning.
     */
    #updateRoomAgentBeliefs() {
        for (const roomAgent of Object.values(roomAgents)) {
            roomAgent.beliefs.declare("MORNING time");
        }
    }

    *exec() {
        let hh = this.goal.parameters["hh"];
        let mm = this.goal.parameters["mm"];
        while (true) {
            yield;
            if (Clock.global.hh == hh && Clock.global.mm == mm) {
                this.#turnOnBedroomLight();
                this.#openAllShutters();
                this.#updateRoomAgentBeliefs();
                break;
            }
        }
    }
}

module.exports = MorningIntention;
