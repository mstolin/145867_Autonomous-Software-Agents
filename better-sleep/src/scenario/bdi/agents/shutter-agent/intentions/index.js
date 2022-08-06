const TurnOnShuttersIntention = require("./TurnOnShuttersIntention");
const TurnOffShuttersIntention = require("./TurnOffShuttersIntention");
const OpenShuttersFullIntention = require("./OpenShuttersFullIntention");
const OpenShuttersHalfIntention = require("./OpenShuttersHalfIntention");
const CloseShuttersIntention = require("./CloseShuttersIntention");

function initIntentions() {
    let { PlanningIntention } = require("../../../../../lib/pddl/Blackbox")([
        CloseShuttersIntention,
        OpenShuttersFullIntention,
        OpenShuttersHalfIntention,
    ]);

    return [
        PlanningIntention,
        TurnOnShuttersIntention,
        TurnOffShuttersIntention,
    ];
}

module.exports = { initIntentions };
