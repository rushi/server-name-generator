## Server Name Generator

A server name generator for AWS Lambda that will generate names based on various topics like color, adjectives, star wars characters etc.

This is built on top of the good [unique-names-generator](https://www.npmjs.com/package/unique-names-generator) library. It extends that library along with a few additional dictionaries. See [src/custom-names.js](blob/main/src/custom-names.js) for the new list.

### Setup

-   `nvm use` (Skip this if you don't use nvm/fnm) Requires node 18
-   `npm ci`
-   `npm start` to start the server in serverless offline mode

`curl -i http://localhost:4000` to generate some names

### Deploy

`npm run deploy` Will deploy to AWS Lambda

### Usage

The following parameters are accepted:

-   `length` The number of words to generate. Default: `2`
-   `style` String style `lowerCase | upperCase | capital` Default: `lowerCase`
-   `type` The dictionaries to use: `person | server` Default: `person`
