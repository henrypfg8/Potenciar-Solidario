const { Router } = require("express");

const { DeletePubCont } = require("../controllers/DeletePublication.js");
const { createPublicationHandler } = require("../handlers/CreatePubHandler.js");
const { login } = require("../handlers/authHandler.js");
const { HandlerGetPublications } = require("../handlers/Publication.js");
const { userPostHandlers } = require("../handlers/PostUser.js");
const { updateUserHan } = require("../handlers/UpdateUser.js");
const { DeleteUserHandler } = require("../handlers/DeleteUserH.js");
const { authRegisterHandler } = require("../handlers/AuthRegisterHandler.js");
const { handlerGetUsers } = require("../handlers/HandlerGetUsers.js");

const router = Router();

// rutas
router.post("/register", authRegisterHandler);
router.post("/users", userPostHandlers);
router.put("/users/:id", updateUserHan);
router.delete("/users/:id", DeleteUserHandler);
router.get("/posts", HandlerGetPublications);
router.get("/posts/:id", HandlerGetPublications);
router.post("/posts", createPublicationHandler);
router.delete("/posts/:id", DeletePubCont);
router.get("/users", handlerGetUsers);
router.get("/users/:id", handlerGetUsers);

module.exports = router;
