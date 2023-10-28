const { User } = require("../db.js");
const bcrypt = require("bcryptjs");

const authRegisterHandler = async (req, res) => {
    const {
        email,
        name,
        lastname,
        description,
        DNI,
        birth_date,
        phone,
        profile_picture,
        habitual_location_of_residence,
        geographical_area_residence,
        admin,
        password,
    } = req.body;

    try {
        const userExist = await User.findOne({ where: { name: name } });

        if (userExist) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            lastname,
            description,
            DNI,
            birth_date,
            phone,
            profile_picture,
            habitual_location_of_residence,
            geographical_area_residence,
            admin,
            password: hashPassword,
        });

        res.status(200).json({
            message: `Usuario ${user.name} creado con éxito`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error de servidor" });
    }
};

module.exports = { authRegisterHandler };
