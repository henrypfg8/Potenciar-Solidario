const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    sequelize.define(
      "Organization",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
  
        nombre: {
          type: DataTypes.STRING,
          allowNull: false,
        },
    },
        { timestamps: false }
      );
      
    };
    