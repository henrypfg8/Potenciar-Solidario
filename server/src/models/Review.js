const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Review",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },

      review: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [20, 1000],
        },
      },
      creationDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true,
        },
      },
    }
  );
};