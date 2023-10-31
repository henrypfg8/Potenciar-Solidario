const {PutPublication} = require("../../controllers/Publication/PutPublication");

const PutPublicationHandler = async (req, res) => {
  const { id } = req.params;
  const {
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
    const putPublication = await PutPublication(id, {
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
    if (!putPublication)
      return res
        .status(401)
        .json({ msg: "No se ha podido actualizar el post" });
    return res.status(200).json(putPublication);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
module.exports = { PutPublicationHandler };
