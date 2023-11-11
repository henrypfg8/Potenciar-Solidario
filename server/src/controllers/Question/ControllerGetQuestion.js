const { Question, Answer , User} = require("../../db.js");

const ControllerGetQuestion = async (id) => {
  if (id) {
    const questionById = await Question.findOne({
      where: { id: id },
      include: [
        { model: Answer , include: {model: User , attributes: ['name',  'profile_picture']}},
        {model: User, attributes: ['name',  'profile_picture']}
      ]
      
    });

    return questionById;
  }

  const questionAll = await Question.findAll({
    include: [
      { model: Answer , include: {model: User , attributes: ['name', 'profile_picture']}},
      {model: User, attributes: ['name', 'profile_picture']}
    ]
  });

  return questionAll;
};

module.exports = { ControllerGetQuestion };
