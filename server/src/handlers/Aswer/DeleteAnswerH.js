const { DeleteAnswer } = require("../../controllers/Aswer/DeleteAnswer");

const DeleteAnswerH = async (req, res) => {
    const {id} = req.params;
    try {
        const answer = await DeleteAnswer(id)
        if (!answer) throw new Error('No se ha podido eliminar Respuesta.')
        res.status(200).send({message:'Registro Eliminado Correctamente', data: answer});
        
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}
module.exports = {
    DeleteAnswerH
}