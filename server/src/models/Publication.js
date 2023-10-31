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
        validate: {
          isInt: true,
          min: 1,
        },
      },

      title: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isString: (value) => {
            if (typeof value !== "string") {
              throw new Error("El titulo debe contener texto válido"); //!
            }
          },
          len: [5, 50],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: [20, 1000],
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true,
          isAfter: "2023-09-30", // Permite desde "2023-10-01" en adelante
    
        },
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true,
          isBefore: "2023-12-02", // Permite hasta "2023-12-01"
        },
      },
      modificationDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true,
          isBefore: "2023-10-01",
        },
      },

      creationDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true,
          isBefore: "2023-10-01",
        },
      },

      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      organization: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [4, 100],
        },
      },

      url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },

      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      registrationLink: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },

      contact: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    /*   likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          isInt: true,
          min: 0, //!
        },
      }, */
    },
    { timestamps: false }
  );
};
