const { GetAnswer } = require("../../controllers/Aswer/GetAnswer");

const GetAnswerH = async (req, res) => {
    const {id} = req.params
    try {
        if(id){
       const allAnswer = await GetAnswer(id)

       if(allAnswer.length === 0) throw new Error('No existen respuestas.')
       return res.status(201).json(allAnswer)
        }
     
       const getAllAnswers = await GetAnswer()
       res.status(200).json(getAllAnswers)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}
module.exports = {
    GetAnswerH
};