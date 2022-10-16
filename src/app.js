const express = require("express");
const { shuffle, deburr } = require("lodash");
const { uniqueNamesGenerator, adjectives, names, starWars, animals } = require("unique-names-generator");
const { marvel, starTrek, gameOfThrones } = require("./custom-names.js");

const app = express();
const DEFAULT_LENGTH = 2;

app.get("/", (req, res, next) => {
    const seed = req.query.hostname ?? req.query.seed ?? Math.random().toString(36).slice(2);
    const length = req.query.length ?? DEFAULT_LENGTH;
    const separator = req.query.separator ?? "-";
    const style = req.query.style ?? "lowerCase";

    const name = getName(seed, separator, style, length);
    console.log("Response", { name, seed, length, separatorChar: separator, style });

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

const getName = (seed, separatorChar, style, length = DEFAULT_LENGTH) => {
    const dictionaries = shuffle([adjectives, animals, names, marvel, gameOfThrones, starWars, starTrek]);
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
    return deburr(shortName);
};

module.exports = app;
