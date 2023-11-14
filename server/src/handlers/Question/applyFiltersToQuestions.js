const { Question, User, Answer } = require("../../db");

const applyFiltersToQuestions = async (req, res) => {
    try {
       
        const {category, fromDate, untilDate} = req.query;
        
        let allQuestions = await Question.findAll({
            include: [
                { model: Answer , include: {model: User , attributes: ['name', 'profile_picture']}},
                {model: User, attributes: ['name', 'profile_picture']}
            ]
        });

        if(category > 0) {
            allQuestions = allQuestions.filter((question) => question.categoryId === Number(category));
        }

        if (fromDate !== "") {
            let from = new Date(fromDate);
            
            allQuestions = allQuestions.filter((question) => 
                new Date(question.createdAt) >= from
            );
        }

        if (untilDate !== "") {
            let until = new Date(untilDate);

            allQuestions = allQuestions.filter((question) => {
                let createdAt = question.createdAt;
                createdAt.setUTCHours(0);
                createdAt.setUTCMinutes(0);
                createdAt.setUTCSeconds(0);
                return new Date(createdAt) <= until
            });
        }
      
        res.status(200).json(allQuestions);


    } catch (error) {
        console.log(error)
        res.status(400).send("No se pudieron obtener las preguntas filtradas")
    }
}

module.exports = { applyFiltersToQuestions };