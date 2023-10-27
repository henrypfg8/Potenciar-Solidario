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
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            category: {
                type: DataTypes.STRING,

                allowNull: true,
            },
            startDate: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },

            endDate: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },

            modificationDate: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },

            creationDate: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },

            status: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            organization: {
                type: DataTypes.STRING,
                allowNull: true,
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
