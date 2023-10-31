const { User } = require("../../db");

const login = async (req, res) => {
  try {
    const { email, password } = req.Query;
    if (!email || !password) {
      res.status(400).send("Faltan datos");
    }

    const user = User.findOne({ where: { email } });

    if (!user) return res.status(404).send("Usuario no encontrado");

    return user.password === password
      ? res.json({
          access: true,
        })
      : res.status(403).send("Contraseña incorrecta");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {login};
