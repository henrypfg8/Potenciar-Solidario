const { Publication } = require("../../db.js");
const { Op } = require("sequelize");

const FilterByDate = async (req, res) => {
    const { initialDate, finalDate } = req.body;
    try {
        const data = await Publication.findAll({
            where: {
                creationDate: {
                    [Op.between]: [initialDate, finalDate],
                },
            },
        });

        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = { FilterByDate };
