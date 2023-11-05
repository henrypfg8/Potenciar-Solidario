const {PostLike} = require("../../controllers/Publication/PostLike");

const HandlerPostLike = async (req, res) => {
  try {
    const { idUser, idPublication } = req.body;

    console.log(idUser, idPublication);
    
    if (!idUser || !idPublication) {
        throw new Error("No se recibieron los parametros necesarios");
      }

 
      const like = await PostLike({idPublication, idUser})

  
      return res.status(200).json(like);
    
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

module.exports = {HandlerPostLike};
