const { Publication } = require("../../db");


const CreatePublication = async (userData) => {
  const newPublication = await Publication.create(userData);
  if (!newPublication) throw new Error("No se pudo crear la Publicación.");
  return newPublication;
};
module.exports = {CreatePublication};
