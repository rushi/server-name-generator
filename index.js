const serverlessExpress = require("aws-serverless-express");
const app = require("./app");

const server = serverlessExpress.createServer(app);

const handler = (event, context) => {
    serverlessExpress.proxy(server, event, context);
};

module.exports = handler;
