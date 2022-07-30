const { observeAllRooms } = require("./rooms");
const { observePersonLocations } = require("./persons");
const { observeHouseSensors } = require("./house");

module.exports = {
    observeAllRooms,
    observePersonLocations,
    observeHouseSensors,
};
