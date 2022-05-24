# ToDo

-   [] Create adjust brightness intention
-   [] Somehow update room agent beliefs using the light sensor (brightness, temp) Probably a sense intention for each room agent
-   [] Maybe its better to have a single room-agent/light-agent instead of many for each single room
-   [] Maybe its even better to have one agent to only adjust the brightness and one for the temperature
-   [] Even if its doesnt make sense, more delay between the people actions in routine.js, because of the http request 

# 🛏 Better-Sleep

This node.js project is an implemention of the proposol for a multi-agent system.
The goal is to provide autonomous behaviour that adjusts and controls the light in
a house to increase the quality of sleep, of its inhabitants.

A more detailed description of the whole project can be found at
[ASA_Assignment_1.pdf](../assignment-1/ASA_Assignment_1.pdf).

# 🗺 Planning Problem

A planning proble ist the light problem.
Whenever a resident enters a room, the room light should turn on.
Otherwise, if a resident leaves a room, the light should turn off.
Additionally, the light of a room should be adjusted accordingly to
the daytime.
A more detailed description about the problem, the description of
the domain, and all necessary domains can be found at [../pddl/light/](../pddl/light/).

All implementation files can be found at [./src/scenario/bdi/agents/](./src/scenario/bdi/agents/).
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

# 😎 Agents

## House-Agent

The house is reponsible to support all room agents. It observes the devices in
the house/rooms and updates the room agent beliefs accordingly.
Additionally, another intention of the house-agent is an alarm. This alarm is
responsible to open all shutters in the morning, and close all shutters in the
evening. Furthermore, it turns on the bedroom light in the morning and turns it
off in the evening.

## Room-Agents

Each room has an agent. The agents goal is to turn on/off the light if a
resident is in the room or not.
Additionally, the room agent is responsible to adjust the temperature and the
brightness of the light according to the daytime.

# ⚙️ Development

## Install Dependencies

To run the scenario/tests, it is required to install all dependencies first:

```
$ npm install
```

## Start the Scenario

In the root directory (where `package.json` is located) execute
the command `$ npm run scenario`.

```
$ npm run scenario
```

# 📄 Project Structure

This section provides an overall description of the project structure.
The implemention details can be found in the corresponding files.

The project consists of the following two main directories:

-   `src/lib` - Includes the library used to implement the scenario. Mostly
    copied from Autonode.js.
-   `src/scenario` - Contains all the implementation used to create a scenario.

## `src/lib/bdi`

This directory incldues all `.js` files used to create a BDI agent, intentions,
goals, and beliefs.
It is copied from Autonode.js.

## `src/lib/pddl`

Includes all `.js` files, needed run pddl domains/problems to create plans
for an agent.
Copied from Autonode.js.

## `src/lib/utils`

Includes the implementation of utils like observer. The files are copied from
Autonode.js, except for `Logger.js` which is a very minimal implementation
of a Logger.

## `src/lib/world`

Includes the implemention of all entities that are present in the
environment/world.

-   `Device.js` - Parent class of a device. Mostly an `Observable`.
-   `House.js` - An implementation of a house.
-   `Light.js` - An implemention of a light. Extends from `Device`.
-   `LightSensor.js` - Implementation if sensor that observes the illuminance of
    a room. Extends from `Device`.
-   `MotionSensor.js` - Implementation of a motion sensor, that observes of a
    resident has entered/left a room. Extends `Device`.
-   `Person.js` - An implementation of a person.
-   `Room.js` - An implemention of a room.
-   `Shutter.js` - An implemention of a shutter. Extends `Device`.

## `src/scenario`

Includes the implementation of the scenario, routine, and the definitio of the
world.

-   `Environment.js` - Initializesthe environment, including initial beleifs and
    devices.
-   `Routine.js` - The routine of the persons.
-   `Scenario.js` - The implemention of the whole scenario.

## `src/scenario/bdi/agents/house-agent`

The definition of the house-agent, its definitions, beliefs, and goals.

-   `Beliefs.js` - The house-agents' initial beliefs.
-   `Goals.js` - Goals the house-agent has to achieve.
-   `HouseAgent.js` - Definition of the house-agent.
-   `intentions/` - All intentions used to achieve the goals.

## `src/scenario/bdi/agents/room-agent`

The definition of the house-agent, its definitions, beliefs, and goals.

-   `index.js` - Generates an agent for each room.
-   `intentions/` - All `pddlActionsIntention` implementation for the room agents.

## `src/scenario/observers`

-   `persons.js` - Observers for all persons in the environment.
-   `rooms.js` - Observers for all rooms of the house.

## `src/scenario/world`

Provides the definitions of the world.

-   `House.js` - Definition of the house.

## `src/scenario/world/persons`

All files needed to define the actors in the environment.

-   `Bob.js` - Definition of the person _Bob_.
-   `PersonIds.js` - Collection of all unique person identifiers.
-   `Persons.js` - The collection of all persons.
-   `Sandra.js` - Definition of person _Sandra_.

## `src/scenario/world/rooms`

All rooms of the environment.
Each room is defined by its on `.js` file.
By default, each room has one main light and 2 shutters.
Additionaly the paths to other rooms are defined.

The following rooms are available:

-   Bathroom
-   Bedroom
-   First Floor
-   Guestroom
-   Kitchen
-   Living Room
-   Second Floor
