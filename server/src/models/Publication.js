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
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'titulo'
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'titulo'
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'titulo'
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: '1991-5-6'
      },

      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: '1990-3-4'
      },

      modificationDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: '2012-2-4'
      },

      creationDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: '2023-3-3'
      },

      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'titulo'
      },

      organization: {
        type: DataTypes.STRING,
        allowNull: true,
        
defaultValue: 'titulo'
      },

      url: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'url'
      },

      image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'imagen'
      },

      registrationLink: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'titulo.com'
      },

      contact: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'contact'
      },
    },
    { timestamps: false}
  );
};
