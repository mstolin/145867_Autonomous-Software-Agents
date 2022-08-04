const pddlActionIntention = require("../../../../../../lib/pddl/actions/pddlActionIntention");

class AdjustAfternoonLightTemperatureliving_roomIntention extends pddlActionIntention {
    static parameters = [
        "living_room-main_light",
        "time",
        "living_room",
    ];
    static precondition = [
        ["LIGHT", "living_room-main_light"],
        ["DAYTIME", "time"],
        ["AFTERNOON", "time"],
        ["ROOM", "living_room"],
        ["LIVING_ROOM", "living_room"],
        ["on", "living_room-main_light"],
        ["not afternoon-temp", "living_room-main_light"],
        ["not free", "living_room"],
    ];
    static effect = [
        ["not morning-temp", "living_room-main_light"],
        ["afternoon-temp", "living_room-main_light"],
    ];

    *exec() {
        let mainLight = this.agent.rooms["living_room"].mainLight;
        yield mainLight.setTemperature(4000);
        for (let b of this.effect) this.agent.beliefs.apply(b);
    }
}

module.exports = AdjustAfternoonLightTemperatureliving_roomIntention;
