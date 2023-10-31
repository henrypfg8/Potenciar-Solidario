const { DataTypes } = require("sequelize");
//Exportamos una funcion que defina el modelo
//Luego le inyectamos la conexion a sequelize

module.exports = (sequelize) => {
  // Defino el modelo
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      email:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      DNI: {
        type: DataTypes.INTEGER,
        unique: true,
        validate: {
          isInt: true,
        },
      },
      birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      organization: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      habitual_location_of_residence: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      geographical_area_residence: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
