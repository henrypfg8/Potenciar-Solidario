const {CreateComment} = require('../../controllers/Comments/CreateCommentC')

const CreateCommentHandler = async(req,res)=>{

  try {

    const {id}= req.params
    const {thread} = req.body
    const newComment = await CreateComment(id, { thread});
    console.log('soy handlers',newComment)
    
    if (!newComment) {
      throw new Error("No se pudo crear el comentario");
    }
    res.status(201).json(newComment)
  } catch (error) {
    res.status(404).json({message:error.message})
  }

    //global.io.emit(`question_${answerId}`);
}
module.exports = { CreateCommentHandler };