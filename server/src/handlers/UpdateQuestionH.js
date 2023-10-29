const { UpdateQuestion } = require("../controllers/UpdateQuestion");

const UpdateQuestionH = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const UpdateQ = await UpdateQuestion(id, { text });
    if (!UpdateQ) throw new Error("Error updating question");
    return res.status(201).json({ message: "question updated successfully" });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

module.exports = {
  UpdateQuestionH,
};
