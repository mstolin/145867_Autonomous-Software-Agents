//const OpenAllShuttersIntention = require("./OpenAllShuttersIntention");
//const OpenAllShuttersHalfwayIntention = require("./OpenAllShuttersHalfwayIntention");
//const CloseShuttersIntention = require("./CloseShuttersIntention");
const TurnOnShuttersIntention = require("./TurnOnShuttersIntention");
const TurnOffShuttersIntention = require("./TurnOffShuttersIntention");
const OpenShuttersFullIntention = require("./OpenShuttersFullIntention");
const OpenShuttersHalfIntention = require("./OpenShuttersHalfIntention");

let { PlanningIntention } = require("../../../../../lib/pddl/Blackbox")([
    OpenShuttersFullIntention,
    OpenShuttersHalfIntention,
]);

module.exports = [
    PlanningIntention,
    TurnOnShuttersIntention,
    TurnOffShuttersIntention,
];
