const Handlebars = require("handlebars");
const fs = require("fs/promises");
const { roomIds } = require("../scenario/world/rooms");

const outputPath =
    "./src/scenario/bdi/agents/light-agent/intentions/pddlIntentions";
const brightnessTemplatePath =
    "./src/templates/AdjustBrightnessIntention.handlebars";
const temperatureTemplatePath =
    "./src/templates/AdjustTemperatureIntention.handlebars";

const brightnessIntentions = [
    {
        time: "Morning",
        not: "evening",
        brightness: 200,
    },
    {
        time: "Afternoon",
        not: "morning",
        brightness: 500,
    },
    {
        time: "Evening",
        not: "afternoon",
        brightness: 300,
    },
];

const temperatureIntentions = [
    {
        time: "Morning",
        not: "evening",
        temperature: 2000,
    },
    {
        time: "Afternoon",
        not: "morning",
        temperature: 4000,
    },
    {
        time: "Evening",
        not: "afternoon",
        temperature: 1900,
    },
];

Handlebars.registerHelper("upper", function (aString) {
    return aString.toUpperCase();
});

Handlebars.registerHelper("lower", function (aString) {
    return aString.toLowerCase();
});

Handlebars.registerHelper("class", (aString) => transformClassName(aString));

function transformClassName(aString) {
    let escapedStr = aString.toLowerCase().replace("-", "").replace("_", "");
    let transformedString =
        escapedStr.charAt(0).toUpperCase() + escapedStr.slice(1);
    return transformedString;
}

function genContent(template, config) {
    const templateFunc = Handlebars.compile(template);
    return templateFunc(config);
}

async function writeFile() {
    try {
        const brightnessTemplate = await fs.readFile(brightnessTemplatePath, {
            encoding: "utf8",
        });
        const temperatureTemplate = await fs.readFile(temperatureTemplatePath, {
            encoding: "utf8",
        });
        for (const roomName of Object.values(roomIds)) {
            for (const brightnessIntentionConfig of brightnessIntentions) {
                brightnessIntentionConfig.roomName = roomName;
                let fileName = `Adjust${
                    brightnessIntentionConfig.time
                }LightBrightness${transformClassName(roomName)}Intention`;
                let path = `${outputPath}/${fileName}.js`;
                //console.log(`const ${fileName} = require("./pddlIntentions/${fileName}.js");`);
                console.log(`require("./pddlIntentions/${fileName}.js"),`);
                let content = genContent(
                    brightnessTemplate,
                    brightnessIntentionConfig
                );
                await fs.writeFile(path, content);
            }
            for (const temperatureIntentionConfig of temperatureIntentions) {
                temperatureIntentionConfig.roomName = roomName;
                let fileName = `Adjust${
                    temperatureIntentionConfig.time
                }LightTemperature${transformClassName(roomName)}Intention`;
                let path = `${outputPath}/${fileName}.js`;
                //console.log(`const ${fileName} = require("./pddlIntentions/${fileName}.js");`);
                console.log(`require("./pddlIntentions/${fileName}.js"),`);
                let content = genContent(
                    temperatureTemplate,
                    temperatureIntentionConfig
                );
                await fs.writeFile(path, content);
            }
        }
    } catch (err) {
        console.error(err);
    }
}

writeFile();
