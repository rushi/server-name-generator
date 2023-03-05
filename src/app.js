const express = require("express");
const { shuffle, deburr } = require("lodash");
const { uniqueNamesGenerator, adjectives, names, colors, starWars, animals } = require("unique-names-generator");
const { marvel, starTrek, gameOfThrones } = require("./custom-names.js");

const app = express();
const DEFAULT_LENGTH = 2;

app.get("/", (req, res, next) => {
    const seed = req.query.hostname ?? req.query.seed ?? Math.random().toString(36).slice(2);
    const length = req.query.length ?? DEFAULT_LENGTH;
    const separator = req.query.separator ?? "-";
    const style = req.query.style ?? "lowerCase";
    // Can be server or person
    const type = req.query.type ?? "person";

    const name = getName(seed, type, separator, style, length);
    console.log("Response", { name, type, seed, length, separatorChar: separator, style });

    res.status(200).send(name);
});

app.get("/error", (req, res, next) => {
    const err = new Error();
    return next(err);
});

app.use((req, res, next) => {
    return res.status(404).json({
        message: "Hey, this is a 404 Not Found",
    });
});

const getName = (seed, type, separatorChar, style, length = DEFAULT_LENGTH) => {
    const dictionaries =
        type === "server"
            ? shuffle([adjectives, animals, colors, names, marvel, gameOfThrones, starWars, starTrek])
            : shuffle([names, names, marvel, gameOfThrones, starWars, starTrek]);
    const words = length >= dictionaries.length ? dictionaries.length : length;
    const separator = separatorChar === ":space:" ? " " : separatorChar;
    const shortName = uniqueNamesGenerator({
        dictionaries,
        separator,
        style,
        seed,
        length: words,
    });

    // return deburr(shortName.replace(/(&)+/gi, "-").toLowerCase());
    return deburr(shortName).replace(/\s+/g, "").toLowerCase();
};

module.exports = app;
