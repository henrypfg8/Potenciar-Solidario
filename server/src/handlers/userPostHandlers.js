const { User } = require("../db");

const userPostHandlers = async (req, res) => {
  try {
    const userData = req.body;

    const newUser = await User.create(userData);
    if (!newUser) throw new Error("Datos erroneos al crear el user");

    // console.log("New User Created", newUser);
    return res
      .status(201)
      .json({ message: "Successfully created a new user", data: newUser });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

module.exports ={ userPostHandlers};
