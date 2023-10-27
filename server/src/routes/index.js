const { Router } = require("express.js");
const userPostHandlers = require("../handlers/userPostHandlers.js");
const deletePublication = require("../controllers/DeletePubHand.js");
const HandlerGetPublications = require("");
const login = require("");

const router = Router();

// rutas
router.get("/posts", HandlerGetPublications);
router.get(`/posts/:id`, HandlerGetPublications);
