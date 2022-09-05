const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const setHeaders = require("./utils/middlewares/setHeaders");
const routes = require("./routes/index.js");
const errorHandler = require("./utils/middlewares/errorHandler");

require("./db.js");

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(setHeaders);

server.use("/", routes);

// Error catching endware.
server.use(errorHandler);

module.exports = server;
