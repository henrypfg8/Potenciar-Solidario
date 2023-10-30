const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Question",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        // toma id del usuario que realiza la pregunta
        type: DataTypes.UUID,
        allowNull: false,
        field: "UserId",
      },
      categoryId: {
        // toma el id de la categoria
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
