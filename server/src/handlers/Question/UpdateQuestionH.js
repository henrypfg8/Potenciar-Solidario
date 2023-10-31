const { UpdateQuestion } = require("../../controllers/Question/UpdateQuestion");

const UpdateQuestionH = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    /* if (!text) throw new Error("Error updating question"); */
    const UpdateQ = await UpdateQuestion(id, { text });
    res.status(200).json(UpdateQ);
    
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

module.exports = {
  UpdateQuestionH,
};
