const { Comment } = require("../../db");

const CreateComment = async (userData) => {//!
  const newComment = await Comment.create(userData);
  console.log('controllers', userData)
  if (!newComment) throw new Error("No se pudo crear el comentario.");
  return newComment;
};
module.exports = {CreateComment};
