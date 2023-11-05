// const { User } = require("./db");
const { Publication, Like,User } = require("../../db");


const getPublications = async (id) => {
  if (id) {
    const idPublication = await Publication.findOne({
      where: { id: id },
      include: [
        { model: Like, attributes: ['id','userId'],  include: {model: User , attributes: ['name']}}
      ]
    });

    return idPublication;
  }

  const AllPublications = await Publication.findAll({
    include: [
      { model: Like, attributes: ['id','userId'], include: {model: User , attributes: ['name']}}
    ]
  });

  return AllPublications;

  //   const AllPublication = await User.findOne({
  //     where: { id: userId },
  //     include: Publication,
  //   });

  //   return AllPublication;
};

module.exports = {getPublications};
