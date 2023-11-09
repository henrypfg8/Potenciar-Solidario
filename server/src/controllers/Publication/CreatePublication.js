const { Publication , User } = require("../../db");
const {postNoti} = require("../../handlers/emailNotif/postNoti")


const CreatePublication = async (userData) => {
  const newPublication = await Publication.create(userData);
  if (!newPublication) throw new Error("No se pudo crear la Publicación.");


  const user = await User.findOne({ where: {id : newPublication.userID}})
  
  postNoti(newPublication.title , user.email);
  
  return newPublication;
};
module.exports = {CreatePublication};
