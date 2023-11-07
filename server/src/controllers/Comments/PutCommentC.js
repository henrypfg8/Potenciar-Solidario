const { Comment } = require("../../db");

const PutComment = async (user, commentData) => {
  try {
    if (user) {
      const findComment = await Comment.findByPk(commentData.id);
      if (!findComment) throw new Error("Comentario no encontrado");

      findComment.thread = commentData.thread;

      await findComment.save();
      return findComment;
    }
} catch (error) {
    throw new Error("Error actualizar el comment: " + error.message);
  }
};
module.exports = { PutComment };
