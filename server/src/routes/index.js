const { Router } = require("express");

const { DeletePubCont } = require("../controllers/DeletePublication.js");
const { createPublicationHandler } = require("../handlers/CreatePubHandler.js");
const { HandlerGetPublications } = require("../handlers/Publication.js");
const { userPostHandlers } = require("../handlers/PostUser.js");
const { updateUserHan } = require("../handlers/UpdateUser.js");
const { DeleteUserHandler } = require("../handlers/DeleteUserH.js");
const { authRegisterHandler } = require("../handlers/AuthRegisterHandler.js");
const { handlerGetUsers } = require("../handlers/HandlerGetUsers.js");
const { authLoginHandler } = require("../handlers/AuthLogin.js");
const { PutPublicationHandler } = require("../handlers/PutPubH.js");
const { handlerCategory } = require("../handlers/HandlerCategory.js");
const { UpdateQuestionH } = require("../handlers/UpdateQuestionH.js");
const { DeleteQuestionHandler } = require("../handlers/DeleteQuestionH.js");
const { getQuestion } = require("../handlers/getQuestion.js");
const { createQuestionHandler } = require("../handlers/CreateQuestionHandler.js");

const router = Router();

// rutas
router.get("/posts/:category", handlerCategory);

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
router.delete("/posts/:id", DeletePubCont);

router.put("/question", UpdateQuestionH);
router.delete("/question/:id", DeleteQuestionHandler);
router.get("/questions", getQuestion);
router.get("/questions/:id", getQuestion);
router.post("/question", createQuestionHandler);
module.exports = router;
