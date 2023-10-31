const { Answer } = require("../../db");

const UpdateAnswer = async (id, userData) => {
  try {
    const updateAnswer = await Answer.findByPk(id);
    if (!updateAnswer) {
      throw new Error("Answer no encontrada");
    }
    updateAnswer.answer = userData.answer;
    await updateAnswer.save();
  } catch (error) {
    throw new Error("No se ha podido actualizar la respuesta");
  }
};
module.exports = { UpdateAnswer };
