const { Router } = require("express.js");
const { login } = require("../authHandler.js");
const { userPostHandlers } = require("../userPostHandlers.js");
const { deletePublication } = require("../../DeletePubHand.js");
// Acá van los handlers

const router = Router();
