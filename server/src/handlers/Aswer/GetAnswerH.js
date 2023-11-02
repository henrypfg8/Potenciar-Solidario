const { GetAnswer } = require("../../controllers/Aswer/GetAnswer");

const GetAnswerH = async (req, res) => {
    const {id} = req.params
    try {
       const allAnswer = await GetAnswer(id)
       if (!allAnswer) throw new Error('No hay respuestas.')
       return res.status(201).json(allAnswer)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}
module.exports = {
    GetAnswerH
};