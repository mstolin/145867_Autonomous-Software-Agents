;; problem file

(define (problem adjust-morning-light)
    (:domain room)

    (:objects mainLight time)

    (:init
        (LIGHT mainLight)
        (DAYTIME time)
        (MORNING time)
    )

    ; Just turn light on
    (:goal (and
        (on mainLight)
        (incandescent-light-temp mainLight)
        (morning-brightness mainLight)
    ))
)
