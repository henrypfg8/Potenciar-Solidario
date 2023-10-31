const { User } = require("../../db");

//Bearer.asddasd1w49801hnfo8912
const authHandler = async (req, res, next) => {
    const { authorization } = req.headers;
    let token = "";
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        token = authorization.substring(7);
    }

    //console.log(token);

    if (!token)
        return res.status(401).json({ error: "token missing or invalid" });

    try {
        let decodenToken = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        //console.log(decodenToken)
        req.userId = decodenToken.id;
        if (decodenToken) {
            console.log("token valido");
            next();
        }
    } catch (error) {
        return res
            .status(401)
            .json({ error: "Error en la validacion del token" });
    }
};

module.exports = { authHandler };
