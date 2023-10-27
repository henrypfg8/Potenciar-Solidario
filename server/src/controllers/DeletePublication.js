const { Publication } = require("../db");

const DeletePubCont = async (id) => {
  const user = await Publication.destroy({ where: { id: id } });

  if (!user) {
    return { deletedRows: 0, message: "User not found" };
  }
  // const deletedRows = await Publication.destroy({
  //   where: { id: id },
  // });
  return user;
};

module.exports = { DeletePubCont };
