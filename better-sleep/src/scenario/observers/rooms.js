const Logger = require("../../lib/utils/Logger");

function observeAllRooms(house) {
    Object.keys(house.rooms).forEach((id) => {
        let room = house.getRoom(id);
        // shutters
        room.shutters.forEach((shutter) => {
            shutter.observe("deviceState", (v, _) =>
                Logger.prefix(shutter.name).log(
                    `Has changed deviceState to ${v}`
                )
            );
            shutter.observe("state", (v, _) =>
                Logger.prefix(shutter.name).log(`Has changed state to ${v}`)
            );
        });
        // main lights
        room.mainLight.observe("deviceState", (v, _) =>
            Logger.prefix(room.mainLight.name).log(
                `Has changed deviceState to ${v}`
            )
        );
        room.mainLight.observe("brightness", (v, _) =>
            Logger.prefix(room.mainLight.name).log(
                `Has changed brightness to ${v}`
            )
        );
        room.mainLight.observe("temperature", (v, _) =>
            Logger.prefix(room.mainLight.name).log(
                `Has changed temperature to ${v}`
            )
        );
        // light sensor
        room.lightSensor.observe("deviceState", (v, _) =>
            Logger.prefix(room.lightSensor.name).log(
                `Has changed deviceState to ${v}`
            )
        );
        room.lightSensor.observe("roomIlluminence", (v, _) =>
            Logger.prefix(room.lightSensor.name).log(
                `Illumince has changed to ${v}`
            )
        );
        // motion sensor
        room.motionSensor.observe("deviceState", (v, _) =>
            Logger.prefix(room.motionSensor.name).log(
                `Has changed deviceState to ${v}`
            )
        );
        room.motionSensor.observe("isOccupied", (v, _) =>
            Logger.prefix(room.motionSensor.name).log(
                `Occupied status has changed to ${v}`
            )
        );
    });
}

module.exports = { observeAllRooms };
