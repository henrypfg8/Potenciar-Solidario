const { User } = require("../db.js");
const bcrypt = require("bcryptjs");
//autenticar usuario
const authLoginHandler = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Ignrese email y contraseña" });
    }

    try {
        const userExist = await User.findOne({ where: { email: email } });
        if (!userExist) {
            return res
                .status(400)
                .json({ message: "error en la utenticacion" });
        }

        const user = await User.findOne({
            where: { email: email, password: hashPassword },
        });

        const passwordValid = await bcryptjs.compare(password, user.password);

        if (passwordValid) {
            res.status(200).json({ message: "Autenticación exitosa" });
        } else {
            return res
                .status(400)
                .json({ message: "error en la utenticacion" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error de servidor" });
    }
};

module.exports = { authLoginHandler };
