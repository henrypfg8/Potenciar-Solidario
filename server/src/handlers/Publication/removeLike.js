const {RemoveLike} = require("../../controllers/Publication/removeLike")

const HandlerRemoveLike = async (req, res) => {
    try {
      const { idPublication } = req.body;
      const idUser = req.userId;
      console.log(idUser, idPublication);
      
      
      if (!idUser || !idPublication) {
          throw new Error("No se recibieron los parametros necesarios");
        }
  
   
        const like = await RemoveLike({idPublication, idUser})
  
    
        return res.status(200).json(like);
      
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  };
  
module.exports = {HandlerRemoveLike};