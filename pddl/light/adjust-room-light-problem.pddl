;; problem file

(define (problem adjust-room-light)
    (:domain room)

    (:objects mainLight time)

    (:init
        (LIGHT mainLight)
        (DAYTIME time)
        ;(MORNING time)
        ;(AFTERNOON time)
        (EVENING time)
    )

    ;; ## MORNING ##
    ;(:goal (and
    ;    (on mainLight)
    ;    (morning-brightness mainLight)
    ;    (incandescent-light-temp mainLight)
    ;))

    ;; ## AFTERNOON ##
    ;(:goal (and
    ;    (on mainLight)
    ;    (afternoon-brightness mainLight)
    ;    (cool-white-light-temp mainLight)
    ;))

    ;; ## EVENING ##
    (:goal (and
        (on mainLight)
        (evening-brightness mainLight)
        (candlelight-temp mainLight)
    ))
)
