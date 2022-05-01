# Better-Sleep

This node.js project is an implemention of the proposol for a multi-agent system.
The goal is to provide autonomous behaviour that adjusts and controls the light in
a house to increase the quality of sleep, of its inhabitants.

# Development

## Install Dependencies

To run the scenario/tests, it is required to install all dependencies first:

```
$ npm install
```

## Run Tests

Run the unit tests using the following command:

```
$ npm run tests
```

## Start the Scenario

In the root directory (where `package.json` is located) execute
the command `$ npm run scenario`.

```
$ npm run scenario
```

# Project Structure

This section provides an overall description of the project structure.
The implemention details can be found in the corresponding files.

## `src/lib/bdi`

This directory includes all `.js` files to provide an BDI agent.
It includes:

* `Agent.js` - The implemention of an agent.
* `BeliefSet.js` - The implemention of beliefs that are used by an agent.
* `Goal.js` - The implemention of an goal, that an agent tries to achieve.
* `Intention.js` - The implemention of an intention. It is used by an agent to achieve a goal.

## `src/lib/utils`

Includes the implemention of all utilities:

* `Clock.js` - An implemention of a clock.
* `Observable.js` - Observables are used to observe the state of an entity.

## `src/lib/world`

Includes the implemention of all entities that are present in the environment/world.

* `House.js` - An implementation of a house.
* `Light.js` - An implemention of a light. This is an `Observable`.
* `Person.js` - An implementation of a person.
* `Room.js` - An implemention of a room.
* `Shutter.js` - An implemention of a shutter as an `Observable`.

## `src/scenario`

Includes the implementation of the scenario, routine, and the definitio of the world.

* `Scenario.js` - The implemention of the whole scenario.
* `Routine.js` - The routine of the persons.

## `src/scenario/world`

Provides the definitions of the world.

* `House.js` - Definition of the house.

## `src/scenario/world/persons`

All files needed to define the actors in the environment.

* `Bob.js` - Definition of the person *Bob*.
* `PersonIds.js` - Collection of all unique person identifiers.
* `Persons.js` - The collection of all persons.
* `Sandra.js` - Definition of person *Sandra*.

## `src/scenario/world/rooms`

All rooms of the environment. 
Each room is defined by the following files:

* `Lights.js` - Defines all lights that are located in the room.
* `Room.js` - The overall definition of the room, including lights and shutters.
* `Shutters.js` - The collection of all shutters of the room.

The following rooms are available:

* Bathroom
* Bedroom
* First Floor
* Guestroom
* Kitchen
* Living Room
* Second Floor
