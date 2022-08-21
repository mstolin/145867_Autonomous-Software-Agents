const { roomIds } = require("../../../../../world/rooms");

class PDDLIntentionFactory {
    static #genPDDLIntentions(intentions) {
        const { PlanningIntention } =
            require("../../../../../../lib/pddl/Blackbox")(intentions);
        return PlanningIntention;
    }

    static #getLowerFloorIntentions() {
        return [
            require("./AdjustMorningLightBrightnessLowerfloorIntention.js"),
            require("./AdjustAfternoonLightBrightnessLowerfloorIntention.js"),
            require("./AdjustEveningLightBrightnessLowerfloorIntention.js"),
            require("./AdjustMorningLightTemperatureLowerfloorIntention.js"),
            require("./AdjustAfternoonLightTemperatureLowerfloorIntention.js"),
            require("./AdjustEveningLightTemperatureLowerfloorIntention.js"),
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

    static #getUpperFloorIntentions() {
        return [
            require("./AdjustMorningLightBrightnessUpperfloorIntention.js"),
            require("./AdjustAfternoonLightBrightnessUpperfloorIntention.js"),
            require("./AdjustEveningLightBrightnessUpperfloorIntention.js"),
            require("./AdjustMorningLightTemperatureUpperfloorIntention.js"),
            require("./AdjustAfternoonLightTemperatureUpperfloorIntention.js"),
            require("./AdjustEveningLightTemperatureUpperfloorIntention.js"),
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
            case roomIds.ID_ROOM_LOWER_FLOOR:
                return this.#genPDDLIntentions(this.#getLowerFloorIntentions());
            case roomIds.ID_ROOM_LIVING_ROOM:
                return this.#genPDDLIntentions(this.#getLivingRoomIntentions());
            case roomIds.ID_ROOM_KITCHEN:
                return this.#genPDDLIntentions(this.#getKitchenIntentions());
            case roomIds.ID_ROOM_UPPER_FLOOR:
                return this.#genPDDLIntentions(this.#getUpperFloorIntentions());
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
