# Planning Domain

At the beginning of the day, Sandra and Bob are
in the Bedroom, where light is turned on.
Both residents want to go to the Guestroom.
To save energy, ther light of a room has to
be turned off, when no resident is in a room.
Otherwise, if a resident enters a room, the 
light has to be turned on.

<table>
    <tr>
        <th>Objects</th>
        <td>
            Persons: Sandra, Bob;
            Rooms: Bedroom, Second Floor, Guestroom
        </td>
    </tr>
    <tr>
        <th>Predicates</th>
        <td>
            Is x a person?;
            Is x a room?;
            Is light on in x?;
            Can move between x and y?
        </td>
    </tr>
    <tr>
        <th>Initial State</th>
        <td>
            Sandra and Bob are in Bedroom;
            Bedroom light is on, all other lights
            are off;
            From Bedroom movement is allowed only to 
            Second-Floor;
            From Second-Floor movement is allowed to
            Bedroom and Guestroom;
            From Guestroom mevement is allowed only to
            Second-Floor
        </td>
    </tr>
    <tr>
        <th>Goal</th>
        <td>
            Sandra and Bob are in Guestroom;
            Light is on in Guestroom, off in
            Bedroom and Second-Floor
        </td>
    </tr>
    <tr>
        <th>Actions</th>
        <td>
            Sandra and Bob can move between rooms;
            The light in a room can be turned on
            or off
        </td>
    </tr>
</table>

## Action - Turn-On-Light

<table>
    <tr>
        <th colspan="2">
            Turn on light in Room y, if Person x is in y
        </th>
    </tr>
    <tr>
        <th>Precondition</th>
        <td>
            x is a Person;
            y is a Room;
            x is in y;
            Light is off in y
        </td>
    </tr>
    <tr>
        <th>Effect</th>
        <td>Light is on in y</td>
    </tr>
</table>

## Action - Turn-Off-Light

<table>
    <tr>
        <th colspan="2">
            Turn off light in Room y, if Person x is not in y
        </th>
    </tr>
    <tr>
        <th>Precondition</th>
        <td>
            x is a Person;
            y is a Room;
            x is not in y;
            Light is on in y
        </td>
    </tr>
    <tr>
        <th>Effect</th>
        <td>Light is off in y</td>
    </tr>
</table>

## Action - Move

<table>
    <tr>
        <th colspan="2">
            Move Person x from Room y to Room z
        </th>
    </tr>
    <tr>
        <th>Precondition</th>
        <td>
            x is a Person;
            y is a Room;
            z is a Room;
            x is in y;
            x is not in z;
            Movement is possible from y to z
        </td>
    </tr>
    <tr>
        <th>Effect</th>
        <td>x is in Room z; x is not in Room y</td>
    </tr>
</table>

# Output

![generated-plan](./plan.png)
