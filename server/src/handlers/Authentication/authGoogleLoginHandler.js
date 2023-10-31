const { User } = require("../../db");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");

const authGoogleHandler = async (req, res) => {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const { idToken } = req.body;

    try {
        const response = await client.verifyIdToken({
            idToken,
            audience: process.env.CLIENT_ID,
        });
        const { email } = response.payload;

        const exist = await User.findOne({ where: { email: email } });

        if (exist) {
            return res.status(200).json({ message: "Acceso concedido" });
        } else {
            return res
                .status(400)
                .json({
                    message:
                        "El correo electrónico no está registrado, por favor regístrese",
                });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Error en la autenticación" });
    }
};

module.exports = { authGoogleHandler };
