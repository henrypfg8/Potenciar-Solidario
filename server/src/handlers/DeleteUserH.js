const DeleteUser = require("../controllers/DeleteUserC.js");

const DeleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const getUser = await DeleteUser(id);
      if (getUser) {
        res.status(204).json(getUser);
      } else {
        res.status(404).send({ message: "No existe un usuario con ese ID" });
      }
    } else {
      throw new Error("No se proporcionó un ID válido");
    }
  } catch (error) {
    // Handle any unhandled errors here, if necessary
    res.status(500).send({ message: error.message }); // Generic error response
  }
};
