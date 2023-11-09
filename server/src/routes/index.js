const { Router } = require("express");

//HANDLERS de PUBLICACION.
const { deletePublication } = require("../handlers/Publication/DeletePub");
const {createPublicationHandler} = require("../handlers/Publication/CreatePubHandler");
const {HandlerGetPublications,} = require("../handlers/Publication/Publication");
const { PutPublicationHandler } = require("../handlers/Publication/PutPubH.js");
const {HandlerRemoveLike} = require("../handlers/Publication/removeLike.js")

//HANDLERS de USUARIOS.
const { userPostHandlers } = require("../handlers/User/PostUser");
const { updateUserHan } = require("../handlers/User/UpdateUser.js");
const { DeleteUserHandler } = require("../handlers/User/DeleteUserH.js");
const { handlerGetUsers } = require("../handlers/User/HandlerGetUsers.js");

//HANDLERS de CATEGORY.
const { handlerCategory } = require("../handlers/Category/HandlerCategory.js");
const { getAllCategories } = require("../handlers/Category/getAllCategories");
const {getForoCategories} = require('../handlers/ForoCategories/handlerAllCategories.js')

//HANDLERS de QUESTION.
const { UpdateQuestionH } = require("../handlers/Question/UpdateQuestionH.js");
const {DeleteQuestionHandler} = require("../handlers/Question/DeleteQuestionH.js");
const { getQuestion } = require("../handlers/Question/getQuestion.js");
const {createQuestionHandler} = require("../handlers/Question/CreateQuestionHandler.js");

//HANDLERS de ANSWER.
const {DeleteAnswerH} = require('../handlers/Aswer/DeleteAnswerH.js')
const {GetAnswerH} = require('../handlers/Aswer/GetAnswerH.js')
const {createAnswerHandler} = require('../handlers/Aswer/CreateAnswer.js')
const {UpdateAnswerHandler} = require('../handlers/Aswer/UpdateAnswer.js')

//HANDLERS de Aunthentication.
const {authRegisterHandler} = require("../handlers/Authentication/AuthRegisterHandler.js");
const { authLoginHandler } = require("../handlers/Authentication/AuthLogin.js");
const { authHandler } = require("../handlers/Authentication/authHandler.js"); //middlewere validacion de rutas
const {authGoogleHandler,} = require("../handlers/Authentication/authGoogleLoginHandler.js");

//HANDLERS de ORGANIZATION.
const { handlerOngs } = require("../handlers/Organization/handlerGetOngs");
const { handlerAllOngs } = require("../handlers/Organization/getAllOngs");

//HANDLERS DE FILTERS
const {FilterByDate} = require("../handlers/Publication/FilterByDateHandler.js");
const { searchPublication } = require("../handlers/searchPublicationH");
const { applyFilters } = require('../handlers/Publication/applyFilters');
const { applyFiltersToQuestions } = require("../handlers/Question/applyFiltersToQuestions"); 
const { HandlerPostLike } = require("../handlers/Publication/PostLike.js");

//HANDLERS DE COMMENTS
const {CreateCommentHandler} = require('../handlers/Comments/CreateCommentH.js')
const {DeleteCommentHandler} = require('../handlers/Comments/DeleteCommentH.js');
const {UpdateCommentHandler} = require('../handlers/Comments/PutCommentH.js')

//HANDLERS DE REVIEWS
const {UpdateReviewHandler} = require('../handlers/Reviews/UpdateReviewH.js')
const {CreateReviewHandler} = require('../handlers/Reviews/CreateReviewH.js')
const {DeleteReviewHandler} = require('../handlers/Reviews/DeleteReviewH.js')

const {forgotPassword} = require('../handlers/Authentication/forgotPassword.js')
const {resetPassword} = require('../handlers/Authentication/resetpassword.js')
const router = Router();

router.get("/posts/busqueda", searchPublication);


// rutas

router.get('/filters?', applyFilters)

//router.get("/ongs/filter", handlerOngs);
router.get("/categories", getAllCategories);
router.get('/forumCategories', getForoCategories)

//router.get("/categories/filter", handlerCategory);
router.get("/ongs", handlerAllOngs);

router.get("/filterByDate", FilterByDate);

//Rutas de LOGEO.
router.post("/register", authRegisterHandler);
router.post("/login", authLoginHandler);

//Rutas de USUARIOS.
router.get("/users", handlerGetUsers);
router.get("/users/:id", handlerGetUsers);
router.post("/users", userPostHandlers);
router.put("/users/:id", updateUserHan);
router.delete("/users/:id", DeleteUserHandler);

//Rutas de PUBLICACION.
router.get("/posts", HandlerGetPublications);
router.get("/posts/:id", HandlerGetPublications);
router.post("/posts", createPublicationHandler);
router.post("/posts/like", authHandler,HandlerPostLike);
router.delete("/posts/like",authHandler, HandlerRemoveLike);
router.put("/posts/:id", PutPublicationHandler);
router.delete("/posts/:id", deletePublication);

//Rutas de PREGUNTAS.
router.put("/questions/:id", UpdateQuestionH);
router.delete("/questions/:id", DeleteQuestionHandler);
router.get("/questions", getQuestion);
router.get("/questions/:id", getQuestion);
router.post("/questions", createQuestionHandler);
router.post("/questions?", applyFiltersToQuestions);

//Rutas de RESPUESTAS.
router.get("/answers", GetAnswerH)
router.post("/answers",createAnswerHandler)
router.put("/answers/:id",UpdateAnswerHandler)
router.delete("/answers/:id", DeleteAnswerH)
router.post("/authGoogle", authGoogleHandler);

//Rutas de COMENTARIOS.
router.post("/answers/comments",CreateCommentHandler)
router.put("/answers/comments/:id",UpdateCommentHandler)
router.delete("/answers/comments/:id",DeleteCommentHandler)

//Rutas de REVIEWS.
router.post("/posts/reviews",CreateReviewHandler)
router.put("/posts/reviews/:id",UpdateReviewHandler)
router.delete("/posts/reviews/:id",DeleteReviewHandler)

//rutas reseteo de contraseña
router.put("/forgotpassword",forgotPassword)
router.put("/resetpassword",resetPassword)

module.exports = router;
