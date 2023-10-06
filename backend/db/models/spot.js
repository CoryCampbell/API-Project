"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Spot extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Spot.belongsTo(models.User, {
                as: "Owner",
                foreignKey: "ownerId",
                onDelete: "CASCADE",
                hooks: true
            });

            Spot.hasMany(models.SpotImage, {
                as: "previewImage",
                foreignKey: "spotId",
                onDelete: "CASCADE",
                hooks: true
            });

            Spot.hasMany(models.Review, {
                as: "avgRating",
                foreignKey: "spotId"
            });
        }
    }
    Spot.init(
        {
            ownerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id"
                }
            },
            address: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            city: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            state: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            country: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            lat: {
                type: DataTypes.DECIMAL,
                allowNull: false
            },
            lng: {
                type: DataTypes.DECIMAL,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            description: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: "Spot"
        }
    );
    return Spot;
};
