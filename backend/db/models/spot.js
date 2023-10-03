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
        }
    }
    Spot.init(
        {
            ownerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true
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
                type: DataTypes.STRING(255),
                allowNull: false
            },
            description: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            avgRating: {
                type: DataTypes.DECIMAL,
                allowNull: false
            },
            previewImage: {
                type: DataTypes.STRING(255),
                allowNull: false,
                validate: {
                    isUrl: true
                }
            }
        },
        {
            sequelize,
            modelName: "Spot"
        }
    );
    return Spot;
};
