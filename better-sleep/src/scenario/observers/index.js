const { observeAllRooms } = require("./rooms");
const { observeAllPersons } = require("./persons");
const { observeHouseSensors } = require("./house");

module.exports = {
    observeAllRooms,
    observeAllPersons,
    observeHouseSensors,
};
