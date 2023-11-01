const express = require("express");
const cokieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index");
const io = require("socket.io")(server);
require("./db.js");

const server = express();
const serverIo = io(server);
server.name = "API";

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cokieParser());
server.use(morgan("dev"));
server.use((_req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "http://localhost:19789",
    "http://localhost:5173"
  ); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

server.use((err, _req, res, _next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

serverIo.on("connection", (socket) => {
  console.log("A user connected via WebSocket");

  socket.on("custom-event", (data) => {
    console.log("Received custom-event:", data);
  });
});

module.exports = server;
