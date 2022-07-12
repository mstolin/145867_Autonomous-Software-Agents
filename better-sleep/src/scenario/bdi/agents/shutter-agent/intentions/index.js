const OpenAllShuttersIntention = require("./OpenAllShuttersIntention");
const OpenAllShuttersHalfwayIntention = require("./OpenAllShuttersHalfwayIntention");
const CloseShuttersIntention = require("./CloseShuttersIntention"); // TODO Still needed?
const OpenAllShuttersMorningIntention = require("./OpenAllShuttersMorningIntention"); // TODO Still needed?
const CloseAllShuttersEveningIntention = require("./CloseAllShuttersEveningIntention");

module.exports = [
    //OpenAllShuttersIntention,
    //OpenAllShuttersHalfwayIntention,
    OpenAllShuttersMorningIntention,
    CloseAllShuttersEveningIntention,
];
