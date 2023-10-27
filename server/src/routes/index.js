const { Router } = require("express");

const { userPostHandlers } = require("../handlers/userPostHandlers.js");
const { deletePublication } = require("../controllers/DeletePubHand.js");
const { createPublicationHandler } = require("../handlers/CreatePubHandler.js");
const { login } = require("../handlers/authHandler.js");
const {
  HandlerGetPublications,
} = require("../handlers/HandlersPublication.js");
const { userPost } = require("../handlers/userPost.js");
const { updateUserHan } = require("../handlers/updateUserHan.js");
const { DeleteUserHandler } = require("../handlers/DeleteUserH.js");


const router = Router();

// rutas
router.post("/register", login);
router.get("/posts", HandlerGetPublications);
router.get("/posts/:id", HandlerGetPublications);
router.post("/posts", createPublicationHandler);
router.post("/user", userPost);
router.put('/users/:id', updateUserHan)
router.delete("/users/:id", DeleteUserHandler);
router.delete("/posts/:id", deletePublication);

module.exports = router;
