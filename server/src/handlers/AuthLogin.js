const { User } = require("../db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

        const passwordValid = await bcrypt.compare(
            password,
            userExist.password
        );
        console.log(passwordValid);

        if (passwordValid) {
            const id = userExist.id;
            const token = jwt.sign({ id: id }, process.env.JWT_SECRET);
            const cookieOptions = {
                expires: new Date(
                    Date.now() +
                        process.env.JWT_TIEMPO_EXPIRA * 24 * 60 * 60 * 1000
                ),
                httpOnly: true,
            };
            //res.cookie("jwt", token, cookieOptions); Esta linea rompe el codigo
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
