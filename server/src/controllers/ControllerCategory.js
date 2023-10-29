const { Publication } = require("../db.js");

const controllerCategory = async (category) => {
  const publiCategory = await Publication.findAll({
    where: { category: category },
  });

  return publiCategory;
};

module.exports = { controllerCategory };
