const {CreateComment} = require('../../controllers/Comments/CreateCommentC')

const createCommentHandler = async(req,res)=>{
    const {thread} = req.body
    const userId = req.userId
}