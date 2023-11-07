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
  let username = 'anonymous'
  socket.on("message", (body) => {
    socket.username = username
    socket.broadcast.emit('message', {
      body,
      from: socket.username
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
 server.use((req, res, next) => {
  if (req.originalUrl === "/login" || req.originalUrl === "/register" || req.originalUrl === "/authGoogle") {
    next(); // Si la ruta es /login, /register o /authGoogle, no se necesita autenticación
  } else {
    authHandler(req, res, (error) => {
      if (error) {
        // Aquí, maneja la respuesta si la autenticación falla o el token es inválido
        console.error("Error de autenticación:", error);

        // Redirige al usuario a la página de inicio de sesión
        return res.redirect("/login");
      }

      // Si la autenticación es exitosa, continúa con la solicitud
      next();
    });
  }
});


server.use("/", routes);

server.use((err, _req, res, _next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = httpServer;
