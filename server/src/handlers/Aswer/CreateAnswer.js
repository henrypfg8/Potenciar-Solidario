const { CreateAnswer } = require("../../controllers/Aswer/CreateAnswer");

const createAnswerHandler = async (req, res) => {
  const { answer, userId, questionId } = req.body;
try {
  if (!answer || !userId || !questionId) {
    throw new Error("La answer, userId y questionId son obligatorios");
  }
  const Answer = await CreateAnswer({ answer, userId, questionId });
  res.status(201).json(Answer);
} catch (error) {
  res.status(400).json({ error: error.message });
}

};
module.exports = { createAnswerHandler };
