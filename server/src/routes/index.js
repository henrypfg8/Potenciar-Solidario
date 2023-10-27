const { Router } = require("express");

const { userPostHandlers } = require("../handlers/userPostHandlers.js");
const { deletePublication } = require("../controllers/DeletePubHand.js");
const { createPublicationHandler } = require("../handlers/CreatePubHandler.js");
const { login } = require("../handlers/authHandler.js");
const {
  HandlerGetPublications,
} = require("../handlers/HandlersPublication.js");
const { userPost } = require("../handlers/userPost.js");
const { handlerGetUsers } = require("../handlers/HandlerGetUsers.js");

const router = Router();

// rutas
router.get("/posts", HandlerGetPublications);
router.get("/posts/:id", HandlerGetPublications);
router.get("/users", handlerGetUsers);
router.get("/users/:id", handlerGetUsers);

router.post("/register", login);
router.post("/posts", createPublicationHandler);
router.post("/users", userPost);

router.delete("/posts/:id", deletePublication);

module.exports = router;
