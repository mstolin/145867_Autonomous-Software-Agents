const pddlActionIntention = require("../../../../lib/pddl/actions/pddlActionIntention");

class TurnOn extends pddlActionIntention {
    static parameters = ["light"];
    static precondition = [
        ["LIGHT", "light"],
        ["not on", "light"],
    ];
    static effect = [["on", "light"]];

    *exec() {
        let mainLight = this.agent.room.mainLight;
        try {
            for (let b of this.effect) this.agent.beliefs.apply(b);
            yield mainLight.turnOn();
        } catch(err) {
            this.log(err);
        }
        
        //yield new Promise((res) => setTimeout(res, 100));
    }
}

class AdjustBrightnessMorning extends pddlActionIntention {
    static parameters = ["light", "time"];
    static precondition = [
        ["LIGHT", "light"],
        ["DAYTIME", "time"],
        ["morning", "time"],
        ["on", "light"],
        ["not morning-brightness", "light"],
    ];
    static effect = [["morning-brightness", "light"]];

    *exec() {
        console.log("Adjust the brightness for the morning");
    }
}

class AdjustBrightnessAfternoon extends pddlActionIntention {
    static parameters = ["light", "time"];
    static precondition = [
        ["LIGHT", "light"],
        ["DAYTIME", "time"],
        ["afternoon", "time"],
        ["on", "light"],
        ["not morning-brightness", "light"],
    ];
    static effect = [["afternoon-brightness", "light"]];

    *exec() {
        console.log("Adjust the brightness for the afternoon");
    }
}

let { PlanningIntention } = require("../../../../lib/pddl/Blackbox")([
    TurnOn,
    AdjustBrightnessMorning,
    AdjustBrightnessAfternoon,
]);

module.exports = [PlanningIntention];
