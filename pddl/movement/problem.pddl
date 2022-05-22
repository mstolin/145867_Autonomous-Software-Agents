;; problem file

(define (problem better-sleep-light-on)
    (:domain better-sleep)

    (:objects sandra bob bedroom secondfloor guestroom)

    ;sandra and bob are in bedroom
    ;light is on in bedroom, off in all other rooms
    (:init (PERSON sandra) (PERSON bob)
           (ROOM bedroom) (ROOM secondfloor) (ROOM guestroom)
           (in-room sandra bedroom)
           (in-room bob bedroom)
           (light-on bedroom)
           (can-move bedroom secondfloor)
           (can-move secondfloor bedroom) 
           (can-move secondfloor guestroom)
           (can-move guestroom secondfloor)
    )

    ;sandra and bob are both in guestroom
    ;light is turned on in guestroom
    (:goal (and
           (in-room sandra guestroom)
           (not (in-room sandra bedroom))
           (not (in-room sandra secondfloor))
           (in-room bob guestroom)
           (not (in-room bob bedroom))
           (not (in-room bob secondfloor))
           (light-on guestroom)
           (not (light-on bedroom))
           (not (light-on secondfloor))
           )
    )
)