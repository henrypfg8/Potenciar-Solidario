const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Organization",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },

      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isString: (value) => {
            if (typeof value !== "string") {
              throw new Error("El nombre debe ser string"); //!
            }
          },
          len: [5, 50],
        },
      },
     
    },
    { timestamps: false }
  );
};
