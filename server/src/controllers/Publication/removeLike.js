const { Like ,  Publication} = require("../../db");

const RemoveLike = async ({ idUser, idPublication}) => {
  const like = await Like.destroy({

    where: {
        userId: idUser ,
        publicationId: idPublication
    }
  });

  if (!like) throw new Error("No se pudo borrar like a la publicacion.");

  const publication = await Publication.findOne({
    where: {id : idPublication}
   });
  
   if(publication.likes > 0) {
    publication.likes = publication.likes - 1 

    await publication.save();
   }
   

    return like;
};
module.exports = {RemoveLike};