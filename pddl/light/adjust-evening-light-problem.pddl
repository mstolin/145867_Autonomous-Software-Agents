;; problem file

(define (problem adjust-evening-light)
    (:domain room)

    (:objects mainLight time thisRoom)

    (:init
        (LIGHT mainLight)
        (ROOM thisRoom)
        (DAYTIME time)
        (EVENING time)
    )

    ; Just turn light on
    (:goal (and
        (on mainLight)
        (evening-temp mainLight)
        (evening-brightness mainLight)
    ))
)
