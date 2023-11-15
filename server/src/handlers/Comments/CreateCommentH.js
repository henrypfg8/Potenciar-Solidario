const {CreateComment} = require('../../controllers/Comments/CreateCommentC')

const CreateCommentHandler = async(req,res)=>{
  const {thread, userId, answerId,questionId} = req.body

  try {

    //if(!thread) throw new Error('Es obligatoria el Thread')

    const newComment = await CreateComment({ thread, userId, answerId,questionId});

    global.io.emit(`question_${questionId}`);

    res.status(201).json(newComment)

  console.log('soy handlers',newComment)
  } catch (error) {
    res.status(404).json({error:error.message})
  }

  
}
module.exports = { CreateCommentHandler };