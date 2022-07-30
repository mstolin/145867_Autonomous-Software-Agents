const Logger = require("../../lib/utils/Logger");

function observeHouseSensors(house) {
    house.illuminanceSensor.observe("deviceState", (v, _) =>
        Logger.prefix(house.illuminanceSensor.name).log(
            `Has changed deviceState to ${v}`
        )
    );
    house.illuminanceSensor.observe("illuminence", (v, _) =>
        Logger.prefix(house.illuminanceSensor.name).log(
            `Outdoor illuminence has changed to ${v}`
        )
    );
}

module.exports = { observeHouseSensors };
