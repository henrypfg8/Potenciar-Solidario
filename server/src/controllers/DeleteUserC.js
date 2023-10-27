const { User } = require("../db");

const DeleteUser = async (userId) => {
  const user = await User.destroy({ where: { id: userId } });

  if (!user) {
    return { deletedRows: 0, message: "User not found" };
  }
  return { deletedRows: user, message: "User deleted successfully" };
};

module.exports = { DeleteUser };
