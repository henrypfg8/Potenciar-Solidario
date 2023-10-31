const { User } = require("../../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//autenticar usuario
const authLoginHandler = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)

    if (!email || !password) {
        return res.status(400).json({ message: "Ingrese email y contraseña" });
    }

    try {
        const userExist = await User.findOne({ where: { email: email } });
        console.log(userExist)
        if (!userExist) {
            return res
                .status(400)
                .json({ message: "error en la utenticacion" });
        }

        const passwordValid = await bcrypt.compare(
            password,
            userExist.password
        );
            console.log(passwordValid)
        if (!passwordValid)
            return res
                .status(400)
                .json({ message: "error en la utenticacion" });

        if (passwordValid) {
            try {
                const payload = { id: userExist.id };
                console.log(payload);
                const privateKey = process.env.JWT_PRIVATE_KEY;
                console.log("privateKey:", privateKey);
                const token = jwt.sign(payload, privateKey, {
                    algorithm: "HS256",
                    expiresIn: "1h",
                });

                return res.send({ jwt: token, id: userExist.id });
            } catch (error) {
                console.error("error en generación de token:", error);
                return res
                    .status(500)
                    .json({ message: "Error en la generación del token" });
            }
        } else {
            return res
                .status(400)
                .json({ message: "error en la autenticación" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error de servidor" });
    }
};

module.exports = { authLoginHandler };
