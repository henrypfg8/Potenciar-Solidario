const { Like } = require("../../db");

const RemoveLike = async ({ idUser, idPublication}) => {
  const like = await Like.destroy({

    where: {
        userId: idUser ,
        publicationId: idPublication
    }
  });

  if (!like) throw new Error("No se pudo borrar like a la publicacion.");

  return like;
};
module.exports = {RemoveLike};