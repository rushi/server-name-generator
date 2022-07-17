const express = require("express");
const { uniqueId } = require("lodash");
const { sampleSize, deburr } = require("lodash");
const { uniqueNamesGenerator, adjectives, colors, starWars, animals } = require("unique-names-generator");
const { marvel, starTrek, gameOfThrones } = require("./custom-names.js");

const app = express();
const DEFAULT_LENGTH = 3;

app.get("/", (req, res, next) => {
    const seed = req.query.hostname ?? req.query.seed ?? uniqueId();
    const length = req.query.length ?? DEFAULT_LENGTH;
    
    const name = getName(seed, length);
    console.log("Response", { name, seed, length });
    
    return res.status(200).send(name);
});

app.get("/error", (req, res, next) => {
    const err = new Error();
    return next(err);
});

app.use((req, res, next) => {
    return res.status(404).json({
        message: "Not Found",
    });
});

const getName = (seed, length = 3) => {
    const dictionaries = [adjectives, animals, colors, marvel, gameOfThrones, starWars, starTrek];
    const words = length >= dictionaries.length ? dictionaries.length : length;
    const shortName = uniqueNamesGenerator({
        dictionaries: sampleSize(dictionaries, words),
        separator: "-",
        style: "lowerCase",
        seed,
        length: words,
    });

    return deburr(shortName.replace(/(&|\s)+/gi, "-").toLowerCase());
};

module.exports = app;
