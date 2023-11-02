const { Answer } = require("../../db");

const GetAnswer = async (id) => {
    
    const allAnswer = await Answer.findAll({ where: id})
    if(!allAnswer) throw new Error('No se pudo traer las preguntas.')
    return allAnswer;

}

module.exports = {
    GetAnswer
}