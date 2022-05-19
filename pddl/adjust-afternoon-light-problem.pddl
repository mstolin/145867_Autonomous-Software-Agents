;; problem file

(define (problem adjust-afternoon-light)
    (:domain room)

    (:objects mainLight time)

    (:init
        (LIGHT mainLight)
        (DAYTIME time)
        (afternoon time)
    )

    ; Just turn light on
    (:goal (and
        (on mainLight)
        (afternoon-brightness mainLight)
    ))
)
