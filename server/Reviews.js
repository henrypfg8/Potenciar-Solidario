const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Review = sequelize.define(
    "review",
    {
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ratingText: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );

  Review.belongsTo(sequelize.models.Post, {
    foreignKey: {
      name: "PostID",
      allowNull: false,
    },
  });

  return Review;
};

//Hacer funcion Math para calcular average
//Hacen falta Post y User models para relacionarlos con la review de cada post
//ellos deberian tener una PK para relacionarlos con la FK
//todo tiene id para relacionar el usuario con su posteo
