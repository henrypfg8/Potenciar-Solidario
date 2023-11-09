const {RemoveLike} = require("../../controllers/Publication/removeLike")

const HandlerRemoveLike = async (req, res) => {
    try {
      const { idPublication } = req.body;
      const userId = req.userId;
      console.log(userId, idPublication);
      
      
      if (!userId || !idPublication) {
          throw new Error("No se recibieron los parametros necesarios");
        }
  
   
        const like = await RemoveLike({idPublication, userId})
  
    
        return res.status(200).json({like, userId});
      
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  };
  
module.exports = {HandlerRemoveLike};