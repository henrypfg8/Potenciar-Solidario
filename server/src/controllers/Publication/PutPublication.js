const { Publication } = require("../../db");

const PutPublication = async (id, postData) => {
  try {
    if (id) {
      const findPublication = await Publication.findByPk(id);
      if (!findPublication) throw new Error("Post no encontrado");

      findPublication.title = postData.title;
      findPublication.description = postData.description;
      findPublication.category = postData.category;
      findPublication.startDate = postData.startDate;
      findPublication.endDate = postData.endDate;
      findPublication.modificationDate = postData.modificationDate;
      findPublication.creationDate = postData.creationDate;
      findPublication.status = postData.status;
      findPublication.organization = postData.organization;
      findPublication.url = postData.url;
      findPublication.image = postData.image;
      findPublication.registrationLink = postData.registrationLink;
      findPublication.contact = postData.contact;

      await findPublication.save();
      return findPublication;
    }
  } catch (error) {
    throw new Error("Error actualizar el post", error);
  }
};
module.exports = { PutPublication };
