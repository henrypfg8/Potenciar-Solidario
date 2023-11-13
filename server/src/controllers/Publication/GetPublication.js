const { Publication, Like, User } = require("../../db");


const getPublications = async (id) => {
  if (id) {
    const idPublication = await Publication.findOne({
      where: { id: id },
      include: [
        { model: Like, attributes: ['id','userId'],  include: {model: User , attributes: ['name']}},
        { model: User, attributes: ['name',  'profile_picture']}
      ]
    });

    return idPublication;
  }

  const AllPublications = await Publication.findAll({
    include: [
      { model: Like, attributes: ['id','userId'], include: {model: User , attributes: ['name']}},
      { model: User, attributes: ['name',  'profile_picture']}
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