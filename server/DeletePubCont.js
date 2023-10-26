const { Publication } = require("../src/db.js");
const { User } = require("../src/db.js");

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

module.exports = DeletePubCont;
