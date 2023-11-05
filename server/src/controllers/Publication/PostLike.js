const { Like } = require("../../db");

const PostLike = async ({ idUser, idPublication}) => {
  const like = await Like.create({
   userId: idUser,
   publicationId: idPublication

  });
  if (!like) throw new Error("No se pudo dar like a la publicacion.");
  return like;
};
module.exports = {PostLike};