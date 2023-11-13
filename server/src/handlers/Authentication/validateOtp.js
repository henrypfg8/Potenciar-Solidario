const { Otp } = require("../../db");
const jwt = require("jsonwebtoken");
const otpValidate = async (req, res) => {

    try {
        const { token } = req.query;
        console.log(token)
        const user = await Otp.findOne({ where: { token : token } });
        if (!user) {
            return res.status(400).json({
                message:
                    "El token ya fue utilizado, solicite reseteo de clave nuevamente",
            });
        }

        let decodenToken = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);

        if(!decodenToken) {
            return res.status(400).json({
                message:
                    "El token es invalido, solicite reseteo de clave nuevamente",
            });
        }
        //console.log(token)
        const cleanToken = await Otp.destroy({ where: { token: token } });
        return res.status(200).json("Validado correctamente");
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {otpValidate}