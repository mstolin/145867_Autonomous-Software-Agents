const House = require("../../lib/world/House");
const rooms = require("./rooms");
const persons = require("./persons/Persons");

let house = new House(persons, rooms);
module.exports = house;
