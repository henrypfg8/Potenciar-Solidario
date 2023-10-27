const { updateUser } = require("../controllers/UpdateUser");

const updateUserHan = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    lastname,
    description,
    DNI,
    birth_date,
    phone,
    profile_picture,
    habitual_location_of_residence,
    geographical_area_residence,
    admin,
  } = req.body;
  try {

    const user = await updateUser(id, {
        name,
        lastname,
        description,
        DNI,
        birth_date,
        phone,
        profile_picture,
        habitual_location_of_residence,
        geographical_area_residence,
        admin,
    })
    if (!user) return res.status(401).json({msg: "No se ha podido actualizar el usuario"})
        
    return res.status(200).json({ msg: 'Usuario Actualizado' }, user);
            
  } catch (error) {
    res.status(401).json({error: error.message})
  }
};

module.exports = {updateUserHan}