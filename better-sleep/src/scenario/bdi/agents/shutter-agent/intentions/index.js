const TurnOnShuttersIntention = require("./TurnOnShuttersIntention");
const TurnOffShuttersIntention = require("./TurnOffShuttersIntention");
const OpenShuttersFullIntention = require("./OpenShuttersFullIntention");
const OpenShuttersHalfIntention = require("./OpenShuttersHalfIntention");
const CloseShuttersIntention = require("./CloseShuttersIntention");

let { PlanningIntention } = require("../../../../../lib/pddl/Blackbox")([
    CloseShuttersIntention,
    OpenShuttersFullIntention,
    OpenShuttersHalfIntention,
]);

module.exports = [
    PlanningIntention,
    TurnOnShuttersIntention,
    TurnOffShuttersIntention,
];
