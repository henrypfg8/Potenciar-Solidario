const express = require("express");
const cokieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index");
const { createServer } = require("http");
const { Server } = require("socket.io");
const {authHandler} = require("./handlers/Authentication/authHandler"); //middleware para proteccion de rutas
require("./db.js");

const server = express();
server.name = "API";
const httpServer = createServer(server);
const io = new Server(httpServer);
global.io = io;

io.on("connection", (socket) => {
  console.log("Un usuario se conecto por WebSockets");
  socket.on("message", (body) => {
    console.log("Evento recibido:", body);
    socket.broadcast.emit('message', {
      body,
      from: socket.id.slice(2)
    })
    // Manejar el evento de websocket
  });
});
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
//--------Proteccion de rutas-----------------
 //middleware para proteccion de rutas
// server.use((req, res, next) => {
//   if (req.originalUrl === "/login" || req.originalUrl === "/register") {
//     next(); //si las rutas son login o register no es necesario estar autenticaodos
//   } else {
//     authHandler(req, res, next); // cualquier ruta que no sean las dos anteriores va a solicitar un token que se genera cuando se inicia sesion
//   }
// });


server.use("/", routes);

server.use((err, _req, res, _next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = httpServer;
