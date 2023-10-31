const { controllerOngs } = require("../controllers/getAllOngsC");

const handlerAllOngs = async (req, res) => {
  try {
    const allOngs = await controllerOngs();
    if (allOngs.length === 0) throw new Error("No existen ONGs");

    return res.status(200).json(allOngs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { handlerAllOngs };
