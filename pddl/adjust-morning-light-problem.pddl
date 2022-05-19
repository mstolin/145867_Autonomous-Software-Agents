;; problem file

(define (problem adjust-morning-light)
    (:domain room)

    (:objects mainLight time)

    (:init
        (LIGHT mainLight)
        (DAYTIME time)
        (morning time)
    )

    ; Just turn light on
    (:goal (and
        (on mainLight)
        (morning-brightness mainLight)
    ))
)
