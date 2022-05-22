;; problem file

(define (problem adjust-evening-light)
    (:domain room)

    (:objects mainLight time)

    (:init
        (LIGHT mainLight)
        (DAYTIME time)
        (EVENING time)
    )

    ; Just turn light on
    (:goal (and
        (on mainLight)
        (candlelight-temp mainLight)
        (evening-brightness mainLight)
    ))
)
