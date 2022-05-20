const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustMorningLightIntention extends pddlActionIntention {
    static parameters = ["light", "time"];
    static precondition = [
        ["LIGHT", "light"],
        ["DAYTIME", "time"],
        ["MORNING", "time"],
    ];
    static effect = [
        ["on", "light"],
        ["morning-brightness", "light"],
        //["incandescent-light-temp", "light"],
    ];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        //mainLight.setTemperature(2000);
        console.log(`Adjust the light ${mainLight.name} for the morning`);
    }
}

module.exports = AdjustMorningLightIntention;
