const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Answer",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      answer: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      creationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
