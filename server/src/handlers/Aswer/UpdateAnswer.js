const { UpdateAnswer } = require("../../controllers/Aswer/UpdateAnswer");

const UpdateAnswerHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { answer } = req.body;
    const updateAnswer = await UpdateAnswer(id, { answer });

    if (!updateAnswer) {
      return res
        .status(404)
        .json({ msg: "No se ha podido actualizar la answer" });
    }
    return res.status(200).json(updateAnswer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { UpdateAnswerHandler };
