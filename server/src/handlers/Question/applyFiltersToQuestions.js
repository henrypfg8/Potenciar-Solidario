const { Question } = require("../../db");

const applyFiltersToQuestions = async (req, res) => {
    try {

        const {category, fromDate, untilDate} = req.query;

        let allQuestions = await Question.findAll();

        if(category !== "") {
            allQuestions = allQuestions.filter((question) => question.category === category);
        }

        if (fromDate !== "") {
            allQuestions = allQuestions.filter((post) => post.startDate >= fromDate);
        }

        if (untilDate !== "") {
            allQuestions = allQuestions.filter((post) => post.startDate <= untilDate);
        }
      
        res.status(200).json(allQuestions);


    } catch (error) {
        res.status(400).send("No se pudieron obtener las preguntas filtradas")
    }
}

module.exports = { applyFiltersToQuestions };