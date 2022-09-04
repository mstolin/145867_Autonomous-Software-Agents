# TL;TR

This is the repository for my project for the course
Autonomous Software Agents at University of Trento
of 2022.

# Project Description

This projects is about an autonomous software agent
that controls the light, using all sources of light,
in a house, to increase the quality of sleep of the
residents.

It does so by controlling all light bulbs of a room
and opening/closing the outdoow window shutters
to enable/prevent outside light in the house.

Additionally, the temperature and brightness of the
artificial light is maintened in accordance to the 
daytime. Meaning, during the day less warm and brighter
light is needed to support high concentration. 
Later warmer light is recommended to help the residents 
to relax. Furthermore, the brightness should transition 
from high to low.

An additional task is to prevent resource waste.
The agent is supposed to turn off lights of an
unoccupied room and only turn on lights if
a resident enters a room.

# Project Structure

The folder [assignment-1/](assignment-1), contains the first
assignment, the project/context/domain description.

At [assignment-3/](assignment-3), the _full-log_ file, specific logs, and the 
final project report can be found.

The folder [better-sleep/](better-sleep/) contains the
implementation of the Multi-Agent System in JavaScript.

At [pddl/](pddl/), `pddl` problem defintions can
be found.
