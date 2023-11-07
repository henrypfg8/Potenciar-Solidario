const {CreateComment} = require('../../controllers/Comments/CreateCommentC')

const CreateCommentHandler = async({thread,userId,commentId})=>{
    const newComment = await CreateComment.create({ thread, userId });
    if (!newComment) {
      throw new Error("No se pudo crear el comentario");
    }
  
    //global.io.emit(`question_${answerId}`);
  
    return newComment;
}
module.exports = { CreateCommentHandler };