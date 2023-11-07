const { DeleteCommentC } = require("../../controllers/Comments/DeleteCommentC");

const DeleteCommentHandler = async (req, res) => {
    const {id} = req.params;
    try {
        const comment = await DeleteCommentC(id)
        if (!comment) throw new Error('No se ha podido eliminar el comentario.')
        res.status(200).send({message:'Comentario eliminado correctamente', data: comment});
        
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}
module.exports = {
    DeleteCommentHandler
}