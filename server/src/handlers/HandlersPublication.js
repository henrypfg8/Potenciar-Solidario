const getPublications = require("../controllers/ControllerGetPublication");

const HandlerGetPublications = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const getOne = await getPublications(id);

      if (getOne.length === 0) {
        throw new Error("No existe esa publicación");
      }

      return res.status(200).json(getOne);
    } else {
      const allPublications = await getPublications();

      res.json(allPublications);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {HandlerGetPublications};
