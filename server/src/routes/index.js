const { Router } = require("express");

const { deletePublication } = require('../handlers/Publication/DeletePub');
const { createPublicationHandler } = require("../handlers/Publication/CreatePubHandler");
const { HandlerGetPublications } = require("../handlers/Publication/Publication.js");
const { userPostHandlers } = require("../handlers/User/PostUser.js");
const { updateUserHan } = require("../handlers/User/UpdateUser.js");
const { DeleteUserHandler } = require("../handlers/User/DeleteUserH.js");
const { authRegisterHandler } = require("../handlers/Authentication/AuthRegisterHandler.js");
const { handlerGetUsers } = require("../handlers/User/HandlerGetUsers.js");
const { authLoginHandler } = require("../handlers/Authentication/AuthLogin.js");
const { PutPublicationHandler } = require("../handlers/Publication/PutPubH.js");
const { handlerCategory } = require("../handlers/Category/HandlerCategory.js");
const { UpdateQuestionH } = require("../handlers/Question/UpdateQuestionH.js");
const { DeleteQuestionHandler } = require("../handlers/Question/DeleteQuestionH.js");
const { getQuestion } = require("../handlers/Question/getQuestion.js");
const { createQuestionHandler } = require("../handlers/Question/CreateQuestionHandler.js");
const {authHandler} = require("../handlers/Authentication/authHandler.js"); //middlewere validacion de rutas

const router = Router();

// rutas
router.get("/posts/category?", handlerCategory);

router.post("/register", authRegisterHandler);
router.post("/login", authLoginHandler);

router.get("/users", handlerGetUsers);
router.get("/users/:id", handlerGetUsers);
router.post("/users", userPostHandlers);
router.put("/users/:id", updateUserHan);
router.delete("/users/:id", DeleteUserHandler);

router.get("/posts", HandlerGetPublications);
router.get("/posts/:id", HandlerGetPublications);
router.post("/posts", createPublicationHandler);
router.put("/posts/:id", PutPublicationHandler);
router.delete("/posts/:id", deletePublication);

router.put("/question/:id", UpdateQuestionH);
router.delete("/question/:id", DeleteQuestionHandler);
router.get("/questions", getQuestion);
router.get("/questions/:id", getQuestion);
router.post("/question", createQuestionHandler);
module.exports = router;
