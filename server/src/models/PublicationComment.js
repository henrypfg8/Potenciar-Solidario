const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "PublicationComment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        }
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      publicationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      comment: {
        type : DataTypes.TEXT,
        allowNull: false,
        }
        },
    { timestamps: true}
  );
  
};

//Los comentarios tienen una pequeña validacion de length y tienen que tener contenido
