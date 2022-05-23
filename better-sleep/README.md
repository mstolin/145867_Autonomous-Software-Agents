# ToDo

* [] Create adjust brightness intention 
* [] Somehow update room agent beliefs using the light sensor (brightness, temp) Probably a sense intention for each room agent

# Better-Sleep

This node.js project is an implemention of the proposol for a multi-agent system.
The goal is to provide autonomous behaviour that adjusts and controls the light in
a house to increase the quality of sleep, of its inhabitants.

# Planning Problem

A planning proble ist the light problem.
Whenever a resident enters a room, the room light should turn on.
Otherwise, if a resident leaves a room, the light should turn off.
Additionally, the light of a room should be adjusted accordingly to
the daytime.
A more detailed description about the problem, the description of 
the domain, and all necessary domains can be found at [../pddl/light/](../pddl/light/).

All implementation files can be found at [./src/bdi/agents/](./src/bdi/agents/).
There are two folders, `house-agent/` and `room-agent/`. The house-agent folder
containes the implementation of the house folder with all its intentions and goals.
The intentions of the house-agent are two sensors. One sensor is responsible to update
the room-agent beliefs, if a resident has entered or left a room.
The other sensor is responsible to update all room-agent beliefs if the daytime has changed
between orning, afternoon, and evening. Moreover, the room-agent posts sub goals to the
room-agent of a room, if a resident entered the room (turn on/off light, adjust temperature,
adjust brightness).

The room-agent folder containes the implementation of all room-agents. Its intentions are the
implementation of the domain and problem available at [../pddl/light/](../pddl/light/).

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
* `Logger.js` - A very minimal implementation of a Logger.

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

## `src/scenario/bdi/agents/house-agent`

The definition of the house-agent, its definitions, beliefs, and goals.

* `Beliefs.js` - The house-agents' initial beliefs.
* `Goals.js` - Goals the house-agent has to achieve.
* `HouseAgent.js` - Definition of the house-agent.
* `Intentions.js` - All intentions used to achieve the goals.
