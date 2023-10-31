const { CreateAnswer } = require("../../controllers/Aswer/CreateAnswer");

const createAnswerHandler = async (req, res) => {
  const { answer } = req.body;
  try {
    if (!answer) {
      throw new Error("La answer es obligatoria");
    }
    const Answer = await CreateAnswer({ answer });
    res.status(201).json(Answer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { createAnswerHandler };
