// const { User } = require("./db");
const { Publication } = require("./db");

const getPublications = async (id) => {
  if (id) {
    const idPublication = await Publication.findOne({
      where: { id: id },
    });

    return idPublication;
  }

  const AllPublications = await Publication.findAll();

  return AllPublications;

  //   const AllPublication = await User.findOne({
  //     where: { id: userId },
  //     include: Publication,
  //   });

  //   return AllPublication;
};

module.exports = getPublications;
