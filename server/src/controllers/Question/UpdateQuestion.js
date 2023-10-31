const { Question } = require("../../db");

const UpdateQuestion = async (id, userData) => {
  try {
    const updateQ = await Question.findByPk(id);
    if (!updateQ) throw new Error("Question no encontrada.");

    updateQ.text = userData.text;

    await updateQ.save();
    
  } catch (error) {
    throw new Error("No se ha podido actualizar la pregunta.");
  }
};
module.exports = {
  UpdateQuestion,
};
