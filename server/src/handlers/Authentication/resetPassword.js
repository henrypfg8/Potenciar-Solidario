const jwt = require("jsonwebtoken");
const { User,Otp } = require("../../db");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const {resetSuccess} = require("../emailNotif/resetSuccess");

const resetPassword = async (req, res) => {
    const { newPassword } = req.body;
    const { authorization } = req.headers;
    let token = "";

    if(!(newPassword && authorization)){
        console.log(`el password es ${newPassword} y el token es ${authorization}`)
        return res.status(400).json({message: "Faltan datos"})
    }

    //si el encabezado comienza con "Bearer " extraigo el token que esta despues del Bearer.
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        token = authorization.substring(7);
    }

    if (!token)
        return res.status(401).json({ error: "token missing or invalid" });

        try { //valido token con clave privada almacenada en enviroment
            let decodenToken = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            //console.log(decodenToken.id)
            req.userId = decodenToken.id;
            if (decodenToken) {
                console.log("token valido");
                const user = await User.findOne({ where: { id: decodenToken.id } });
                console.log(user)
                const hashPassword = await bcrypt.hash(newPassword, 10);
                user.password = hashPassword;
                await user.save()
                resetSuccess(user.email)
                const cleanToken = await Otp.destroy({ where: { token: token } });
                return res.status(200).json({message: "Contraseña actualizada"})
            }
        } catch (error) {
            return res
                .status(401)
                .json({message: error.message });
        }
}

module.exports = {resetPassword}