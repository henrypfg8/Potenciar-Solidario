const { userPostHandlers } = require("./userPostHandlers");

const userPost = async (req, res) => {
  userPostHandlers(req, res);
};

module.exports = userPost;
