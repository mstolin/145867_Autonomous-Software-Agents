;; problem file

(define (problem adjust-morning-light)
    (:domain room)

    (:objects mainLight time thisRoom)

    (:init
        (LIGHT mainLight)
        (ROOM thisRoom)
        (DAYTIME time)
        (MORNING time)
    )

    ; Just turn light on
    (:goal (and
        (on mainLight)
        (morning-temp mainLight)
        (morning-brightness mainLight)
    ))
)
