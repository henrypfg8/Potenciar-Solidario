const { Review } = require("../db");

const PostReview = async (userData) => {
  const newReview = await Review.create(userData);
  if (!newReview) throw new Error("Error al crear la Review");
  return newReview;
};
module.exports = { PostReview };
