;; domain file

(define (domain room)
    (:requirements :strips)

    (:predicates
        (DAYTIME ?time) ;; Is daytime?
        (LIGHT ?light) ;; Is a light?
        (MORNING ?time) ;; Is morning?
        (AFTERNOON ?time) ;; Is afternoon?
        (EVENING ?time) ;; Is evening?
        (on ?light) ;; Is light on?
        (morning-brightness ?light) ;; Is brightness for morning?
        (afternoon-brightness ?light) ;; Is brightness for afternoon?
        (evening-brightness ?light) ;; Is brightness for evening?
        (candlelight-temp ?light)
        (incandescent-light-temp ?light)
        (neutral-light-temp ?light)
        (cool-white-light-temp ?light)
        (bright-white-light-temp ?light)
        (clear-sunlight-temp ?light)
    )

    ;; Turn on light
    (:action turn-on
        :parameters (?light)

        ;; Has to be a light
        ;; Light has to be off
        :precondition (and
            (LIGHT ?light)
            (not (on ?light))
        )

        :effect (on ?light)
    )

    ;; Turn off light
    (:action turn-off
        :parameters (?light)

        ;; Has to be a light
        ;; Light must be already on
        :precondition (and
            (LIGHT ?light)
            (on ?light)
        )

        :effect (not (on ?light))
    )

    ;; Adjust temperature for the morning
    (:action adjust-temperature-morning
        ;; Light and daytime needed
        :parameters (?light ?time)

        ;; Light has to be on
        ;; Has to be morning
        ;; Temperature should not already be set to incandescent
        :precondition (and
            (LIGHT ?light)
            (DAYTIME ?time)
            (MORNING ?time)
            (on ?light)
            (not (incandescent-light-temp ?light))
        )

        :effect (incandescent-light-temp ?light)
    )

    ;; Adjust temperature for the afternoon
    (:action adjust-temperature-afternoon
        ;; Light and daytime needed
        :parameters (?light ?time)

        ;; Light has to be on
        ;; Has to be afternoon
        ;; Temperature should not already be set to cool-white
        :precondition (and
            (LIGHT ?light)
            (DAYTIME ?time)
            (AFTERNOON ?time)
            (on ?light)
            (not (cool-white-light-temp ?light))
        )

        :effect (cool-white-light-temp ?light)
    )

    ;; Adjust temperature for the evening
    (:action adjust-temperature-evening
        ;; Light and daytime needed
        :parameters (?light ?time)

        ;; Light has to be on
        ;; Has to be evening
        ;; Temperature should not already be set to candlelight
        :precondition (and
            (LIGHT ?light)
            (DAYTIME ?time)
            (EVENING ?time)
            (on ?light)
            (not (candlelight-temp ?light))
        )

        :effect (candlelight-temp ?light)
    )

    ;; Adjust the brightness for the morning
    (:action adjust-brightness-morning
        ;; A light and the daytime
        :parameters (?light ?time)

        ;; The light has to be on
        ;; The light should not be configured for morning
        ;; The daytime has to be morning
        :precondition (and
            (LIGHT ?light)
            (DAYTIME ?time)
            (MORNING ?time)
            (on ?light)
            (not (morning-brightness ?light))
        )

        :effect (morning-brightness ?light)
    )

    ;; Adjust the brightness for the afternoon
    (:action adjust-brightness-afternoon
        ;; A light and the daytime
        :parameters (?light ?time)

        ;; The light has to be on
        ;; The light should not be configured for afternoon
        ;; The daytime has to be afternoon
        :precondition (and
            (LIGHT ?light)
            (DAYTIME ?time)
            (AFTERNOON ?time)
            (on ?light)
            (not (afternoon-brightness ?light))
        )

        :effect (afternoon-brightness ?light)
    )

    ;; Adjust the brightness for the evening
    (:action adjust-brightness-evening
        ;; A light and the daytime
        :parameters (?light ?time)

        ;; The light has to be on
        ;; The light should not be configured for evening
        ;; The daytime has to be evening
        :precondition (and
            (LIGHT ?light)
            (DAYTIME ?time)
            (EVENING ?time)
            (on ?light)
            (not (evening-brightness ?light))
        )

        :effect (evening-brightness ?light)
    )
)
