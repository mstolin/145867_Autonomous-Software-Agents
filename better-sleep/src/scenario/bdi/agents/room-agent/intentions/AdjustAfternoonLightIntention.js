const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustAfternoonLightIntention extends pddlActionIntention {
    static parameters = ["light", "time"];
    static precondition = [
        ["LIGHT", "light"],
        ["DAYTIME", "time"],
        ["AFTERNOON", "time"],
    ];
    static effect = [
        ["on", "light"],
        ["afternoon-brightness", "light"],
        ["cool-white-light-temp", "light"],
    ];

    *exec() {
        console.log("Adjust the light for the afternoon");
    }
}

module.exports = AdjustAfternoonLightIntention;
