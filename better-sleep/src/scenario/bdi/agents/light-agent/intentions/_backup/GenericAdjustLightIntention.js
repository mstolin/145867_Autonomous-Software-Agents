const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class GenericAdjustIntentionFactory {
    static #genGenericAdjustIntention(room, preconditions, effect, adjustFunc) {
        class GenericAdjustLightIntention extends pddlActionIntention {
            static parameters = [room.mainLight.name, "time", room.name];
            static precondition = [
                ["LIGHT", room.mainLight.name],
                ["DAYTIME", "time"],
                ["AFTERNOON", "time"],
                ["ROOM", room.name],
                ["on", room.mainLight.name],
                ...preconditions,
            ];
            static effect = [...effect];

            *exec() {
                try {
                    yield adjustFunc();
                    for (let b of this.effect) this.agent.beliefs.apply(b);
                } catch (err) {
                    this.log(err);
                }
            }
        }

        return GenericAdjustLightIntention;
    }

    static #_genGenericAdjustIntention = (
        room,
        preconditions,
        effect,
        adjustFunc
    ) =>
        class extends pddlActionIntention {
            static parameters = [room.mainLight.name, "time", room.name];
            static precondition = [
                ["LIGHT", room.mainLight.name],
                ["DAYTIME", "time"],
                ["AFTERNOON", "time"],
                ["ROOM", room.name],
                ["on", room.mainLight.name],
                ...preconditions,
            ];
            static effect = [...effect];

            *exec() {
                try {
                    yield adjustFunc();
                    for (let b of this.effect) this.agent.beliefs.apply(b);
                } catch (err) {
                    this.log(err);
                }
            }
        };

    static genAdjustMorningTempIntention(room, adjustFunc) {
        return this.#_genGenericAdjustIntention(
            room,
            [
                ["not morning-temp", room.mainLight.name],
                ["not free", room.name],
            ],
            [
                ["not evening-temp", room.mainLight.name],
                ["morning-temp", room.mainLight.name],
            ],
            adjustFunc
        );
    }

    static genAdjustAfternoonTempIntention(room, adjustFunc) {
        return this.#_genGenericAdjustIntention(
            room,
            [
                ["not afternoon-temp", room.mainLight.name],
                ["not free", room.name],
            ],
            [
                ["not morning-temp", room.mainLight.name],
                ["afternoon-temp", room.mainLight.name],
            ],
            adjustFunc
        );
    }

    static genAdjustEveningTempIntention(room, adjustFunc) {
        return this.#_genGenericAdjustIntention(
            room,
            [
                ["not evening-temp", room.mainLight.name],
                ["not free", room.name],
            ],
            [
                ["not afternoon-temp", room.mainLight.name],
                ["evening-temp", room.mainLight.name],
            ],
            adjustFunc
        );
    }

    static genAdjustMorningBrightnessIntention(room, adjustFunc) {
        return this.#_genGenericAdjustIntention(
            room,
            [
                ["not morning-brightness", room.mainLight.name],
                ["not free", room.name],
            ],
            [
                ["not evening-brightness", room.mainLight.name],
                ["morning-brightness", room.mainLight.name],
            ],
            adjustFunc
        );
    }

    static genAdjustAfternoonBrightnessIntention(room, adjustFunc) {
        return this.#_genGenericAdjustIntention(
            room,
            [
                ["not afternoon-brightness", room.mainLight.name],
                ["not free", room.name],
            ],
            [
                ["not morning-brightness", room.mainLight.name],
                ["afternoon-brightness", room.mainLight.name],
            ],
            adjustFunc
        );
    }

    static genAdjustEveningBrightnessIntention(room, adjustFunc) {
        return this.#_genGenericAdjustIntention(
            room,
            [
                ["not evening-brightness", room.mainLight.name],
                ["not free", room.name],
            ],
            [
                ["not afternoon-brightness", room.mainLight.name],
                ["evening-brightness", room.mainLight.name],
            ],
            adjustFunc
        );
    }
}

module.exports = GenericAdjustIntentionFactory;
