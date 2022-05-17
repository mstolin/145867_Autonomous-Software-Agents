;; domain file

; OBJECTS:
; Persons: sandra, bob
; Rooms: bedroom, second-floor, guestroom

(define (domain better-sleep)
    (:requirements :strips)
    
    (:predicates (ROOM ?x) ;Is x a room?
                 (PERSON ?x) ;Is x a person?
                 (light-on ?x) ;Is light on in room x?
                 (in-room ?x ?y) ;Is person x in room y?
                 (can-move ?x ?y) ;Can move from room x to room y
    )
                 
    (:action turn-on-light ;Turn on light if x is in y
        :parameters (?x ?y)
        
        ;x has to be person, y has to be a room
        ;x has to be in y, light has to be off in y
        :precondition (and (PERSON ?x) (ROOM ?y) (in-room ?x ?y) 
                           (not (light-on ?y)))
        
        ;Turn on light in y
        :effect (light-on ?y)
    )
    
    (:action turn-off-light ;Turn off light if x is not in y
        :parameters (?x ?y)
        
        ;x has to be a person, y has to be a room
        ;x is not in y, light is on in y
        :precondition (and (PERSON ?x) (ROOM ?y)
                           (not (in-room ?y ?x))
                           (light-on ?y))
        
        ;Turn off light in y 
        :effect (not (light-on ?y))
    )
        
    (:action move ;Move person x from room y to room z
        :parameters (?x ?y ?z)
        
        ;x has to be a person, y and z have to be rooms
        ;x has to be in y, x cannot be in z
        :precondition (and (PERSON ?x) (ROOM ?y) (ROOM ?z)
                           (can-move ?y ?z)
                           (in-room ?x ?y) (not (in-room ?x ?z)))
        
        ;x is not in room y, x is in room z
        ;Turn light off in y, turn light on in z
        :effect (and (not (in-room ?x ?y)) (in-room ?x ?z))
                     ;(not (light-on ?y)) (light-on ?z)) ; Turn light on/off on activity
    )
)
