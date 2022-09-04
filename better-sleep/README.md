# 🛏 Better-Sleep

This node.js project is an implemention of the proposol for a multi-agent system.
The goal is to provide autonomous behaviour that adjusts and controls the light in
a house to increase the quality of sleep, of its inhabitants.

A more detailed description of the whole project can be found at
[Final-Report.pdf](../assignment-3/Final-Report.pdf).

# ⚙️ Development

## 1. Add Blackbox Executable

First you have to add the blackbox executable into `./bin`.
This project is developed on Linux, therefore, the path to the executable has
been altered at [./src/lib/pddl/Blackbox.js:37](./src/lib/pddl/Blackbox.js#L37).
If you want to tun the scenario on windows, include the `.exe` at `./bin` 
instead, and fix the path at `Blackbox.js`.

## 2. Init NPM

To run the scenario/tests, it is required to install all dependencies first:

```
$ npm install
```

## 3. Start the Scenario

In the root directory (where `package.json` is located) execute
the command `$ npm run scenario`.

```
$ npm run scenario
```

## If needed: Generated intentions

Using the script `src/utils/generateAdjustIntentions.js`, the adjust intentions
can be re-generated.

```
$ npm run genIntentions
```

# 📄 Project Structure

The source code is located at `src/`. the folder `src/lib` contains an extended
version of [Autonode.js](https://github.com/marcorobol/Autonode.js). In
`src/scenario`, the source code of the scenario and its entities are located.
`src/templates` contains the templates for PDDL intentions that can be generated
with the script contained at `src/utils`.
