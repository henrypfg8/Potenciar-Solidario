const { userPostHandlers } = require("../handlers/PostUser");

const userPost = async (req, res) => {
  userPostHandlers(req, res);
};

module.exports = {userPost};
