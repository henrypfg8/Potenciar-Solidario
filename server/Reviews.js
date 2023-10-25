const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Reviews = sequelize.define(
    "review",
    {
      rating: {
        id: DataTypes.STRING,
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ratingText: {
        id: DataTypes.STRING,
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
  return Reviews;
};

//Hacer funcion Math para calcular average
//Hacen falta Post y User models para relacionarlos con la review de cada post
//ellos deberian tener una PK para relacionarlos con la FK
//todo tiene id para relacionar el usuario con su posteo
