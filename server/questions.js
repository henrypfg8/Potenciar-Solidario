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
      text: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      userId: {
        // toma id del usuario que realiza la pregunta
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        // toma el id de la categoria
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};
