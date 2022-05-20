const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustEveningLightIntention extends pddlActionIntention {
    static parameters = ["light", "time"];
    static precondition = [
        ["LIGHT", "light"],
        ["DAYTIME", "time"],
        ["EVENING", "time"],
    ];
    static effect = [
        ["on", "light"],
        ["evening-brightness", "light"],
        //["candlelight-temp", "light"],
    ];

    *exec() {
        console.log("Adjust the light for the evening");
    }
}

module.exports = AdjustEveningLightIntention;
