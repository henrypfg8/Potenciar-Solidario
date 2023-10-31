const {Question} = require('../../db.js');

const createQuestionHandler = async (req, res) => {
    const {text,userId,categoryId} = req.body;

    try {
        if(!text){return res.status(400).json({error: 'Falta ingresar texto para la pregunta'})}
        const question = await Question.create({text,userId,categoryId});
        res.status(200).json(question);

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {createQuestionHandler}

