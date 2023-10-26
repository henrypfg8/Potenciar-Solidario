const { Publication } = require("./src/models/Publication.js");
const { User } = require("./src/models/user.js");

const DeletePubHandler = async (id, userId) => {
  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    return { deletedRows: 0, message: "User not found" };
  }
  const deletedRows = await Publication.destroy({
    where: { id: id, UserId: userId },
  });
  return deletedRows;
};

module.exports = DeletePubHandler;
