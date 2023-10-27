const { Router } = require("express");

const { userPostHandlers } = require("../handlers/userPostHandlers.js");
const { deletePublication } = require("../controllers/DeletePubHand.js");
const { createPublicationHandler } = require("../handlers/CreatePubHandler.js");
const { login } = require("../handlers/authHandler.js");
const {
  HandlerGetPublications,
} = require("../handlers/HandlersPublication.js");
const { userPost } = require("../handlers/userPost.js");


const router = Router();

// rutas
router.get("/posts", HandlerGetPublications);
router.get("/posts/:id", HandlerGetPublications);
router.post("/register", login);
router.post("/posts", createPublicationHandler);
router.post("/post", userPost);
router.delete("/post/:id", deletePublication);

module.exports = router;
