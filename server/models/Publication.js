const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Publication",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(1234),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },

      modificationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      creationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      organization: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      registrationLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      contact: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
