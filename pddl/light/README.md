# Planning Domain

Residents of the house will move through rooms during
the day. When a resident enters the room, the light of
the room should be switched on. Otherwise, if the 
residents leave the room, no resident is in the room,
the light of the room should be switched off.

Another problem case is, to adjust the light according 
to the daytime. Morning, afternoon, and evening have 
different requirements of light brightness and temperature.
Therefore, whenever a light has been switched on, the
brightness and temperature of the light has to be set 
accordingly to the daytime.

## Domain - Room

<table>
    <tr>
        <th colspan="2">room-domain.pddl</th>
    </tr>
    <tr>
        <th>Predicates</th>
        <td>
            <ul>
                <li>(DAYTIME ?time) - Is time a daytime?</li>
                <li>(LIGHT ?light) - Is light a light?</li>
                <li>(MORNING ?time) - Is time morning?</li>
                <li>(AFTERNOON ?time) - Is time afternoon?</li>
                <li>(EVENING ?time) - Is time evening?</li>
                <li>(ROOM ?room) - Is room a room?</li>
                <li>(free ?room) - Is the room free?</li>
                <li>(on ?light) - Is the light turned on?</li>
                <li>(morning-brightness ?light) - Is the brightness of the light for the morning?</li>
                <li>(afternoon-brightness ?light) - Is the brightness of the light for the afternoon?</li>
                <li>(evening-brightness ?light) - Is the brightness of the light for the evening?</li>
                <li>(morning-temperature ?light) - Is the temperature of the light for the morning?</li>
                <li>(afternoon-temperature ?light) - Is the temperature of the light for the afternoon?</li>
                <li>(evening-temperature ?light) - Is the temperature of the light for the evening?</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Actions</th>
        <td>
            Turn on a light<br/>
            Turn off a light<br/>
            Adjust temperature for the morning<br/>
            Adjust temperature for the afternoon<br/>
            Adjust temperature for the evening<br/>
            Adjust brightness for the morning<br/>
            Adjust brightness for the afternoon<br/>
            Adjust brightness for the evening<br/>
        </td>
    </tr>
</table>

### Action - Turn-On-Light

<table>
    <tr>
        <th colspan="2">
            Turn on light, if room is not free and the light is off
        </th>
    </tr>
    <tr>
        <th>Precondition</th>
        <td>
            <ul>
                <li>light is a LIGHT</li>
                <li>room is a ROOM</li>
                <li>light is not on</li>
                <li>room is free</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Effect</th>
        <td>light is on</td>
    </tr>
</table>

### Action - Turn-Off-Light

<table>
    <tr>
        <th colspan="2">
            Turn off light, if room is free and light is on
        </th>
    </tr>
    <tr>
        <th>Precondition</th>
        <td>
            <ul>
                <li>light is a LIGHT</li>
                <li>room is a ROOM</li>
                <li>light is on</li>
                <li>room is not free</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Effect</th>
        <td>Light is off</td>
    </tr>
</table>

### Action - Adjust-Temperature-Morning

<table>
    <tr>
        <th colspan="2">
            Adjust the brightess for the morning
        </th>
    </tr>
    <tr>
        <th>Precondition</th>
        <td>
            <ul>
                <li>light is a LIGHT</li>
                <li>room is a ROOM</li>
                <li>time is DAYTIME</li>
                <li>time is MORNING</li>
                <li>light is on</li>
                <li>room is not free</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Effect</th>
        <td>Light is adjusted for morning</td>
    </tr>
</table>

### Action - Adjust-Temperature-Afternoon

<table>
    <tr>
        <th colspan="2">
            Adjust the brightess for the afternoon
        </th>
    </tr>
    <tr>
        <th>Precondition</th>
        <td>
            <ul>
                <li>light is a LIGHT</li>
                <li>room is a ROOM</li>
                <li>time is DAYTIME</li>
                <li>time is AFTERNOON</li>
                <li>light is on</li>
                <li>room is not free</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Effect</th>
        <td>Light is adjusted for afternoon</td>
    </tr>
</table>

### Action - Adjust-Temperature-Evening

<table>
    <tr>
        <th colspan="2">
            Adjust the brightess for the evening
        </th>
    </tr>
    <tr>
        <th>Precondition</th>
        <td>
            <ul>
                <li>light is a LIGHT</li>
                <li>room is a ROOM</li>
                <li>time is DAYTIME</li>
                <li>time is EVENING</li>
                <li>light is on</li>
                <li>room is not free</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Effect</th>
        <td>Light is adjusted for evening</td>
    </tr>
</table>

## Problem - Adjust light for the morning

### Definition

<table>
    <tr>
        <th colspan="2">
            adjust-morning-light-problem.pddl
        </th>
    </tr>
    <tr>
        <th>Objects</th>
        <td>
            <strong>Lights:</strong> mainLight (The main light of the room)<br/>
            <strong>Time:</strong> time (Current daytime)<br/>
            <strong>Rooms:</strong> thisRoom (Current room)
        </td>
    </tr>
    <tr>
        <th>Initial State</th>
        <td>
            <ul>
                <li>mainLight is a LIGHT</li>
                <li>thisRoom is a ROOM</li>
                <li>time is DAYTIME</li>
                <li>time is MORNING</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Goal</th>
        <td>
            <ul>
                <li>mainLight is on</li>
                <li>mainLight temperature is set for the morning</li>
                <li>mainLight brightness is set for the morning</li>
            </ul>
        </td>
    </tr>
</table>

### Execution

```
$ blackbox -o room-domain.pddl -f adjust-morning-light-problem.pddl
```

```
----------------------------------------------------
Begin plan
1 (turn-on mainlight thisroom)
2 (adjust-temperature-morning mainlight time thisroom)
2 (adjust-brightness-morning mainlight time thisroom)
End plan
----------------------------------------------------
```

## Problem - Adjust light for the afternoon

### Definition

<table>
    <tr>
        <th colspan="2">
            adjust-afternoon-light-problem.pddl
        </th>
    </tr>
    <tr>
        <th>Objects</th>
        <td>
            <strong>Lights:</strong> mainLight (The main light of the room)<br/>
            <strong>Time:</strong> time (Current daytime)<br/>
            <strong>Rooms:</strong> thisRoom (Current room)
        </td>
    </tr>
    <tr>
        <th>Initial State</th>
        <td>
            <ul>
                <li>mainLight is a LIGHT</li>
                <li>thisRoom is a ROOM</li>
                <li>time is DAYTIME</li>
                <li>time is AFTERNNON</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Goal</th>
        <td>
            <ul>
                <li>mainLight is on</li>
                <li>mainLight temperature is set for the afternoon</li>
                <li>mainLight brightness is set for the afternoon</li>
            </ul>
        </td>
    </tr>
</table>

### Execution

```
$ blackbox -o room-domain.pddl -f adjust-afternoon-light-problem.pddl
```

```
----------------------------------------------------
Begin plan
1 (turn-on mainlight thisroom)
2 (adjust-brightness-afternoon mainlight time thisroom)
2 (adjust-temperature-afternoon mainlight time thisroom)
End plan
----------------------------------------------------
```

## Problem - Adjust light for the evening

### Definition

<table>
    <tr>
        <th colspan="2">
            adjust-evening-light-problem.pddl
        </th>
    </tr>
    <tr>
        <th>Objects</th>
        <td>
            <strong>Lights:</strong> mainLight (The main light of the room)<br/>
            <strong>Time:</strong> time (Current daytime)<br/>
            <strong>Rooms:</strong> thisRoom (Current room)
        </td>
    </tr>
    <tr>
        <th>Initial State</th>
        <td>
            <ul>
                <li>mainLight is a LIGHT</li>
                <li>thisRoom is a ROOM</li>
                <li>time is DAYTIME</li>
                <li>time is EVENING</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Goal</th>
        <td>
            <ul>
                <li>mainLight is on</li>
                <li>mainLight temperature is set for the evening</li>
                <li>mainLight brightness is set for the evening</li>
            </ul>
        </td>
    </tr>
</table>

### Execution

```
$ blackbox -o room-domain.pddl -f adjust-evening-light-problem.pddl
```

```
----------------------------------------------------
Begin plan
1 (turn-on mainlight thisroom)
2 (adjust-temperature-evening mainlight time thisroom)
2 (adjust-brightness-evening mainlight time thisroom)
End plan
----------------------------------------------------
```
