const { Comment } = require("../../db");

const CreateComment = async (userData) => {//!
  const newComment = await Comment.create(userData);
  if (!newComment) throw new Error("No se pudo crear el comentario.");
  return newComment;
};
module.exports = {CreateComment};
