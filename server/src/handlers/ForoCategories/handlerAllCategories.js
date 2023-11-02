const { controllerForoCategories } = require('../../controllers/ForoCategories/ControllerForoCat');

const getForoCategories = async (req, res) => {
  try {
    const allCategories = await controllerForoCategories();

    if (allCategories.length === 0) throw new Error("No existen categorias");

    return res.status(200).json(allCategories);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getForoCategories };