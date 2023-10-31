const { Answer } = require("../../db");

const CreateAnswer = async (userData) => {
  const newAnswer = await Answer.create(userData);
  if (!newAnswer) {
    throw new Error("No se pudo crear la answer");
  }
  return newAnswer;
};
module.exports = { CreateAnswer };
