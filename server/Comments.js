const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Comments = sequelize.define(
    "comments",
    {
      user: {
        type: DataTypes.STRING,
      },
      thread: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El texto no puede estar vacío",
          },
          len: {
            args: [10, 300],
            msg: "Debe tener entre 10 y 300 caracteres",
          },
        },
      },
    },
    {
      timestamps: true,
    }
  );

  return Comments;
};

//Los comentarios tienen una pequeña validacion de length y tienen que tener contenido
