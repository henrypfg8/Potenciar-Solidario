const { controllerCategory } = require("../../controllers/Category/ControllerCategory");

const handlerCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const categoryFn = await controllerCategory(category);
    if (categoryFn.length === 0)
      throw new Error("No existen Publicaciones con la categoria seleccionada");

    return res.status(200).json(categoryFn);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { handlerCategory };
