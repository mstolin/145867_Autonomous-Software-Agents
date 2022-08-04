const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustEveningLightBrightnessliving_roomIntention extends pddlActionIntention {
    static parameters = [
        "living_room-main_light",
        "time",
        "living_room",
    ];
    static precondition = [
        ["LIGHT", "living_room-main_light"],
        ["DAYTIME", "time"],
        ["EVENING", "time"],
        ["ROOM", "living_room"],
        ["LIVING_ROOM", "living_room"],
        ["on", "living_room-main_light"],
        ["not evening-brightness", "living_room-main_light"],
        ["not free", "living_room"],
    ];
    static effect = [
        ["not afternoon-brightness", "living_room-main_light"],
        ["evening-brightness", "living_room-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.rooms["living_room"].mainLight;
        yield mainLight.setBrightness(300);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustEveningLightBrightnessliving_roomIntention;
