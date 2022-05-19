;; domain file

(define (domain room)
    (:requirements :strips)

    (:predicates
        (DAYTIME ?time) ;; Is daytime?
        (LIGHT ?light) ;; Is a light?
        (on ?light) ;; Is light on?
        (morning ?time) ;; Is morning?
        (afternoon ?time) ;; Is afternoon?
        (evening ?time) ;; Is evening?
        (morning-brightness ?light) ;; Is brightness for morning?
        (afternoon-brightness ?light) ;; Is brightness for afternoon?
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
            (morning ?time)
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
            (afternoon ?time)
            (on ?light)
            (not (afternoon-brightness ?light))
        )

        :effect (afternoon-brightness ?light)
    )
)
