const { controllerOngs } = require("../controllers/ControllerGetOngs");

const handlerOngs = (req, res) => {
  try {
    const { ongs } = req.query;
    const OngsFn = controllerOngs(ongs);

    if (OngsFn.length === 0)
      throw new Error("No existen Publicaciones con la categoria seleccionada");

    return res.status(200).json(OngsFn);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { handlerOngs };
