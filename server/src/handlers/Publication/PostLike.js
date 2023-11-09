const {PostLike} = require("../../controllers/Publication/PostLike");

const HandlerPostLike = async (req, res) => {
  try {
    const { idPublication } = req.body;
    const userId = req.userId;
    //console.log(userId, idPublication);
    
    if (!userId || !idPublication) {
        throw new Error("No se recibieron los parametros necesarios");
      }

      
      const like = await PostLike({idPublication, userId})

  
      return res.status(200).json(like);
    
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

module.exports = {HandlerPostLike};
