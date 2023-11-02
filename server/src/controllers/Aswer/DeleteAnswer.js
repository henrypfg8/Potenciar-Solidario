const { Answer } = require("../../db");

const DeleteAnswer = async (id) => {
    const answerDelete = await Answer.destroy(id)
    if(!answerDelete) throw new Error('No se ha podido eliminar la Respuesta.')
    return answerDelete;
}

module.exports = {
    DeleteAnswer,
}