const {DeletePubCont }= require("../../controllers/Publication/DeletePublication.js");

//DOMpurify for DOM sanitization
const deletePublication = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const deletedRows = await DeletePubCont(id);
    if (deletedRows !== 0) {
      res.status(200).json({
        message: "La publicación fue borrada exitosamente",
      });
    } else {
      res.status(404).json({
        message: "Publicacion no encontrada",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ocurrió un error al intentar borrar la publicación",
    });
  }
};

module.exports = {
  deletePublication,
};
