const {UpdateComment} = require("../../controllers/Comments/PutCommentC")

const UpdateCommentHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const { thread } = req.body;
      const updateComment = await UpdateComment(id, { thread });
  
      if (!updateComment) {
        return res
          .status(404)
          .json({ msg: "No se ha podido actualizar el comment" });
      }
      return res.status(200).json(updateComment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports = { UpdateCommentHandler };