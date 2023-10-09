"use strict";
const { Model, Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Spot, {
                foreignKey: "ownerId",
                onDelete: "CASCADE",
                hooks: true,
                as: "Owner"
            });

            User.hasMany(models.Review, {
                foreignKey: "userId",
                onDelete: "CASCADE",
                hooks: true
            });

            User.hasMany(models.Booking, {
                foreignKey: "userId",
                onDelete: "CASCADE",
                hooks: true
            });

            User.belongsToMany(models.Spot, {
                through: models.Booking,
                foreignKey: "userId",
                otherKey: "spotId"
            });
        }
    }
    User.init(
        {
            firstName: {
                type: DataTypes.STRING(55),
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING(55),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
                validate: {
                    len: [3, 255],
                    isEmail: true
                }
            },
            username: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true,
                validate: {
                    len: [4, 30],
                    isNotEmail(value) {
                        if (Validator.isEmail(value)) {
                            throw new Error("Cannot be an email.");
                        }
                    }
                }
            },
            hashedPassword: {
                type: DataTypes.STRING.BINARY,
                allowNull: false,
                validate: {
                    len: [60, 60]
                }
            }
        },
        {
            sequelize,
            modelName: "User",
            defaultScope: {
                attributes: {
                    exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
                }
            }
        }
    );
    return User;
};
