const { Publication } = require("../db");
const { User } = require("../db");

const DeletePubCont = async (id, userId) => {
  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    return { deletedRows: 0, message: "User not found" };
  }
  const deletedRows = await Publication.destroy({
    where: { id: id, UserId: userId },
  });
  return deletedRows;
};

module.exports = {DeletePubCont};
