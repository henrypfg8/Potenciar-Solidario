const { User } = require("../db");

const updateUser = async (userId, userData) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) throw new Error("Usuario no encontrado");

    user.name = userData.name;
    user.lastName = userData.lastName;
    user.description = userData.description;
    user.DNI = userData.DNI;
    user.birth_date = userData.birth_date;
    user.phone = userData.phone;
    user.profile_picture = userData.profile_picture;
    user.habitual_location_of_residence =
      userData.habitual_location_of_residence;
    user.geographical_area_residence = userData.geographical_area_residence;
    user.admin = userData.admin;

    await user.save();
    return user;
  } catch (error) {
    throw new Error("Error actualizar el usuario", error);
  }
};

module.exports = {
    updateUser,
}
