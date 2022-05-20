const pddlActionIntention = require("../../../../lib/pddl/actions/pddlActionIntention");

class FakeAction extends pddlActionIntention {
    /**exec() {
        console.log("##############################################");
        console.log("EFFECT:", this.effect);
        for (let b of this.effect) this.agent.beliefs.apply(b);
        console.log("##############################################");
        yield new Promise((res) => setTimeout(res, 100));
        this.log("effects applied");
        // this.log(this.agent.beliefs)
    }*/
}

class TurnOn extends FakeAction {
    static parameters = ["light"];
    static precondition = [
        ["LIGHT", "light"],
        ["not on", "light"],
    ];
    static effect = [["on", "light"]];

    *exec() {
        //yield room.light.turnOnLight();
        /*console.log("TURN ON THE LIGHT");
        for(let belief of this.effect) {
            this.log("#### BELIEF", belief);
        }
        yield new Promise((res) => setTimeout(res, 100));*/
    }
}

class AdjustBrightnessMorning extends FakeAction {
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

class AdjustBrightnessAfternoon extends FakeAction {
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
