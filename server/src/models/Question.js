const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Question",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isString: (value) => {
            if (typeof value !== "string") {
              throw new Error("El titulo debe contener texto válido"); //!
            }
          },
          len: [5, 50],
        },
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [20, 1000],
        },
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
        validate: {
          isInt: true,
          min: 1,
        },
      },
    }
  );
};
