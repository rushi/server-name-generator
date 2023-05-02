const serverless = require("serverless-http");
const app = require("./app");
const cors = require("cors");
app.use(cors());

module.exports.handler = serverless(app);
