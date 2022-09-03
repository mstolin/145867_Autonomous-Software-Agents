const Logger = require("../../lib/utils/Logger");

/**
 * This function observes the sensors of the
 * given house.
 *
 * @param {House} house
 */
function observeHouseSensors(house) {
    house.outdoorLightSensor.observe("deviceState", (v, _) =>
        Logger.prefix(house.outdoorLightSensor.name).log(
            `Has changed deviceState to ${v}`
        )
    );
    house.outdoorLightSensor.observe("illuminence", (v, _) =>
        Logger.prefix(house.outdoorLightSensor.name).log(
            `Outdoor illuminence has changed to ${v}`
        )
    );
}

module.exports = { observeHouseSensors };
