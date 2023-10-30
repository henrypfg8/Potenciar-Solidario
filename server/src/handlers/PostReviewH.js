const { PostReview } = require("../controllers/PostReview");

const PostReviewH = async (req, res) => {
  const { rating, ratingText } = req.body;
  try {
    if (!rating || !ratingText) throw new Error("Faltan datos");
    const newReview = await PostReview({ rating, ratingText });
    return res.status(201).json(newReview);
  } catch (error) {
    res.satus(403).json({ error: error.message });
  }
};
module.exports = { PostReviewH };
