const OpenShutterIntention = require("./OpenAllShuttersIntention");
const CloseShuttersIntention = require("./CloseShuttersIntention");
const OpenAllShuttersMorningIntention = require("./OpenAllShuttersMorningIntention");
const CloseAllShuttersEveningIntention = require("./CloseAllShuttersEveningIntention");

module.exports = [OpenAllShuttersMorningIntention, CloseAllShuttersEveningIntention];
