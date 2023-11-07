const { Answer } = require("../../db");
const {Comment} = require('../../db')

const GetAnswer = async (id) => {
    
    const allAnswer = await Answer.findAll(
        { where: { id: id},
        include : {model: Comment}
    })
    if(!allAnswer) throw new Error('No se pudo traer las preguntas.')
    return allAnswer;

}

module.exports = {
    GetAnswer
}