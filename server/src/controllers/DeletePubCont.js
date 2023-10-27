const { Publication } = require("../db");
const { User } = require("../db");

const DeletePubCont = async (id) => {
  const user = await User.findOne({ where: { id: id } });

  if (!user) {
    return { deletedRows: 0, message: "User not found" };
  }
  const deletedRows = await Publication.destroy({
    where: { id: id },
  });
  return deletedRows;
};

module.exports = {DeletePubCont};
