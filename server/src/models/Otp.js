const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Otp",
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

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
