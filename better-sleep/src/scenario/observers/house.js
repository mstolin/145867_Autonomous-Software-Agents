const house = require("../world/House");
const Logger = require("../../lib/utils/Logger");

const observeHouseSensors = () => {
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
};

module.exports = {observeHouseSensors};
