const { Comment } = require("../../db");

const CreateComment = async ({thread, userId, answerId}) => {//!
  const newComment = await Comment.create({thread, userId, answerId});
  console.log('controllers', newComment)
  if (!newComment) throw new Error("No se pudo crear el comentario.");
  
  global.io.emit(`answer_${answerId}`)
  
  return newComment;




};
module.exports = {CreateComment};
