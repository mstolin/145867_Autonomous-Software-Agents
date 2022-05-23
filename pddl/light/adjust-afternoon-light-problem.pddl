;; problem file

(define (problem adjust-afternoon-light)
    (:domain room)

    (:objects mainLight time thisRoom)

    (:init
        (LIGHT mainLight)
        (ROOM thisRoom)
        (DAYTIME time)
        (AFTERNOON time)
    )

    ; Just turn light on
    (:goal (and
        (on mainLight)
        (cool-white-light-temp mainLight)
        (afternoon-brightness mainLight)
    ))
)
