const { roomIds } = require("../../../../../world/rooms");

class PDDLIntentionFactory {
    static #genPDDLIntentions(intentions) {
        const { PlanningIntention } =
            require("../../../../../../lib/pddl/Blackbox")(intentions);
        return PlanningIntention;
    }

    static #getFirstFloorIntentions() {
        return [
            require("./AdjustMorningLightBrightnessFirstfloorIntention.js"),
            require("./AdjustAfternoonLightBrightnessFirstfloorIntention.js"),
            require("./AdjustEveningLightBrightnessFirstfloorIntention.js"),
            require("./AdjustMorningLightTemperatureFirstfloorIntention.js"),
            require("./AdjustAfternoonLightTemperatureFirstfloorIntention.js"),
            require("./AdjustEveningLightTemperatureFirstfloorIntention.js"),
        ];
    }

    static #getLivingRoomIntentions() {
        return [
            require("./AdjustMorningLightBrightnessLivingroomIntention.js"),
            require("./AdjustAfternoonLightBrightnessLivingroomIntention.js"),
            require("./AdjustEveningLightBrightnessLivingroomIntention.js"),
            require("./AdjustMorningLightTemperatureLivingroomIntention.js"),
            require("./AdjustAfternoonLightTemperatureLivingroomIntention.js"),
            require("./AdjustEveningLightTemperatureLivingroomIntention.js"),
        ];
    }

    static #getKitchenIntentions() {
        return [
            require("./AdjustMorningLightBrightnessKitchenIntention.js"),
            require("./AdjustAfternoonLightBrightnessKitchenIntention.js"),
            require("./AdjustEveningLightBrightnessKitchenIntention.js"),
            require("./AdjustMorningLightTemperatureKitchenIntention.js"),
            require("./AdjustAfternoonLightTemperatureKitchenIntention.js"),
            require("./AdjustEveningLightTemperatureKitchenIntention.js"),
        ];
    }

    static #getSecondFloorIntentions() {
        return [
            require("./AdjustMorningLightBrightnessSecondfloorIntention.js"),
            require("./AdjustAfternoonLightBrightnessSecondfloorIntention.js"),
            require("./AdjustEveningLightBrightnessSecondfloorIntention.js"),
            require("./AdjustMorningLightTemperatureSecondfloorIntention.js"),
            require("./AdjustAfternoonLightTemperatureSecondfloorIntention.js"),
            require("./AdjustEveningLightTemperatureSecondfloorIntention.js"),
        ];
    }

    static #getGuestroomIntentions() {
        return [
            require("./AdjustMorningLightBrightnessGuestroomIntention.js"),
            require("./AdjustAfternoonLightBrightnessGuestroomIntention.js"),
            require("./AdjustEveningLightBrightnessGuestroomIntention.js"),
            require("./AdjustMorningLightTemperatureGuestroomIntention.js"),
            require("./AdjustAfternoonLightTemperatureGuestroomIntention.js"),
            require("./AdjustEveningLightTemperatureGuestroomIntention.js"),
        ];
    }

    static #getBedroomIntentions() {
        return [
            require("./AdjustMorningLightBrightnessBedroomIntention.js"),
            require("./AdjustAfternoonLightBrightnessBedroomIntention.js"),
            require("./AdjustEveningLightBrightnessBedroomIntention.js"),
            require("./AdjustMorningLightTemperatureBedroomIntention.js"),
            require("./AdjustAfternoonLightTemperatureBedroomIntention.js"),
            require("./AdjustEveningLightTemperatureBedroomIntention.js"),
        ];
    }

    static #getBathroomIntentions() {
        return [
            require("./AdjustMorningLightBrightnessBathroomIntention.js"),
            require("./AdjustAfternoonLightBrightnessBathroomIntention.js"),
            require("./AdjustEveningLightBrightnessBathroomIntention.js"),
            require("./AdjustMorningLightTemperatureBathroomIntention.js"),
            require("./AdjustAfternoonLightTemperatureBathroomIntention.js"),
            require("./AdjustEveningLightTemperatureBathroomIntention.js"),
        ];
    }

    static genPDDLIntentions(roomId) {
        switch (roomId) {
            case roomIds.ID_ROOM_FIRST_FLOOR:
                return this.#genPDDLIntentions(this.#getFirstFloorIntentions());
            case roomIds.ID_ROOM_LIVING_ROOM:
                return this.#genPDDLIntentions(this.#getLivingRoomIntentions());
            case roomIds.ID_ROOM_KITCHEN:
                return this.#genPDDLIntentions(this.#getKitchenIntentions());
            case roomIds.ID_ROOM_SECOND_FLOOR:
                return this.#genPDDLIntentions(this.#getSecondFloorIntentions());
            case roomIds.ID_ROOM_GUESTROOM:
                return this.#genPDDLIntentions(this.#getGuestroomIntentions());
            case roomIds.ID_ROOM_BEDROOM:
                return this.#genPDDLIntentions(this.#getBedroomIntentions());
            case roomIds.ID_ROOM_BATHROOM:
                return this.#genPDDLIntentions(this.#getBathroomIntentions());
            default:
                throw new Error(`No room found for ID ${roomId}`);
        }
    }
}

module.exports = PDDLIntentionFactory;
