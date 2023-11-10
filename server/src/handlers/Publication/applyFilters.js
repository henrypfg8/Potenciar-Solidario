const { Publication, User } = require("../../db");

const applyFilters = async (req, res) => {
  try {
    
    const { category, ong, fromDate, untilDate, user } = req.query;

    let allPosts = await Publication.findAll();

    if (category !== "") {
      allPosts = allPosts.filter((post) => post.category === category);
    }

    if (ong !== "") {
      allPosts = allPosts.filter((post) => post.organization === ong);
    }

    if (fromDate !== "") {
      allPosts = allPosts.filter((post) => post.startDate >= fromDate);
    }

    if (untilDate !== "") {
      allPosts = allPosts.filter((post) => post.startDate <= untilDate);
    }

    if (user !== "") {
      allPosts = allPosts.filter(post => post.userID === user);
    }

    res.status(200).json(allPosts);

  } catch (error) {
    res.status(400).send("No se pudieron obtener las publicaciones filtradas");
  }
};

module.exports = { applyFilters };
