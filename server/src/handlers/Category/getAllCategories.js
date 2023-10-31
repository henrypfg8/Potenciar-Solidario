const { controllerCategories } = require("../../controllers/Category/getAllCategoriesC");

const getAllCategories = async (req, res) => {
  try {
    const allCategories = await controllerCategories();
    if (allCategories.length === 0) throw new Error("No existen categorias");

    return res.status(200).json(allCategories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllCategories };
