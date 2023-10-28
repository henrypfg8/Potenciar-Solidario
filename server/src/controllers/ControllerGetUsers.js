const { User, Publication } = require("../db");

const controllerGetUsers = async (id) => {
  if (id) {
    const user = await User.findById(id, {
      include: { model: Publication },
    });
    return user;
  }

  const allUsers = await User.findAll({
    include: { model: Publication },
  });
  return allUsers;
};

module.exports = {controllerGetUsers};
