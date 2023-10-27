const { User } = require("../db.js");

//autenticar usuario
const authLoginHandler = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Ignrese email y contraseña" });
    }

    try {
        const user = await User.findOne({
            where: { email: email, password: password },
        });

        if (!user) {
            return res
                .status(401)
                .json({ message: "error en la utenticacion" });
        }

        res.status(200).json({ message: "Autenticación exitosa" });
    } catch (error) {
        res.status(500).json({ message: "Error de servidor" });
    }
};

module.exports = { authLoginHandler };