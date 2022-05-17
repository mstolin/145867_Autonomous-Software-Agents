;; problem file

(define (problem better-sleep-light-on)
    (:domain better-sleep)
    (:objects sandra bob bedroom secondfloor guestroom)
    ;sandra and bob are in bedroom
    ;light is not on in any room
    (:init (PERSON sandra) (PERSON bob)
           (ROOM bedroom) (ROOM secondfloor) (ROOM guestroom)
           (in-room sandra bedroom) (not (in-room sandra secondfloor))
           (not (in-room sandra guestroom))
           (in-room bob bedroom) (not (in-room bob secondfloor))
           (not (in-room bob guestroom))
           (not (light-on bedroom)) (not (light-on secondfloor))
           (not (light-on guestroom))
           (can-move bedroom secondfloor) (not (can-move bedroom guestroom))
           (can-move secondfloor bedroom) (can-move secondfloor guestroom)
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
