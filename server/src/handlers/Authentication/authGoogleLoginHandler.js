const { User } = require("../../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Controlador de autenticación de Google
const authGoogleHandler = async (req, res) => {
    const { googleUserId, email } = req.body; // Supongamos que el cliente envía el ID y correo de Google

    if (!googleUserId || !email) {
        return res.status(400).json({ message: "Datos de Google incompletos" });
    }

    try {
        const userExist = await User.findOne({ where: { email: email } });

        if (!userExist) {
            // Si el correo de Google no se encuentra en la base de datos, puedes crear un nuevo usuario o manejarlo como prefieras.
            // Aquí, creamos un nuevo usuario con ese correo.
            const newUser = await User.create({ email: email, googleUserId: googleUserId });
            
            // Puedes generar un token para el nuevo usuario y devolvérselo.
            const payload = { id: newUser.id };
            const privateKey = process.env.JWT_PRIVATE_KEY;
            const token = jwt.sign(payload, privateKey, {
                algorithm: "HS256",
                expiresIn: "1h",
            });

            return res.send({ jwt: token, id: newUser.id });
        } else {
            // Si el correo de Google ya existe en la base de datos, puedes autenticar al usuario existente.
            const payload = { id: userExist.id };
            const privateKey = process.env.JWT_PRIVATE_KEY;
            const token = jwt.sign(payload, privateKey, {
                algorithm: "HS256",
                expiresIn: "1h",
            });

            return res.send({ jwt: token, id: userExist.id });
        }
    } catch (error) {
        res.status(500).json({ message: "Error de servidor" });
    }
};

module.exports = { authGoogleHandler };
