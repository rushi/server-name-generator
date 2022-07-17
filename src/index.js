const serverlessExpress = require("aws-serverless-express");
const app = require("./app");

const server = serverlessExpress.createServer(app);

const handler = (event, context) => {
    serverlessExpress.proxy(server, event, context);
};

if (process.env.IS_SERVERLESS) {
    module.exports = { default: handler };
} else {
    module.exports = handler;
}
