const { Publication } = require("../db.js");

const createPublicationHandler = async (req, res) => {
  const {
    id,
    title,
    description,
    category,
    startDate,
    endDate,
    modificationDate,
    creationDate,
    status,
    organization,
    url,
    image,
    registrationLink,
    contact,
  } = req.body;

  try {
    if (!title || !description || !category || !contact || !organization) {


      throw new Error("Faltan campos obligatorios");
    }

    const publication = await Publication.create({
      id,
      title,
      description,
      category,
      startDate,
      endDate,
      modificationDate,
      creationDate,
      status,
      organization,
      url,
      image,
      registrationLink,
      contact,
    });

    res.status(201).json(publication);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createPublicationHandler };
