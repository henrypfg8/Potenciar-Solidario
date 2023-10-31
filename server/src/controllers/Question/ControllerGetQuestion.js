const { Question, Answer } = require("../../db.js");

const ControllerGetQuestion = async (id) => {
  if (id) {
    const questionById = await Question.findOne({
      where: { id: id },
      include: { model: Answer },
    });

    return questionById;
  }

  const questionAll = await Question.findAll({
    include: { model: Answer },
  });

  return questionAll;
};

module.exports = { ControllerGetQuestion };
