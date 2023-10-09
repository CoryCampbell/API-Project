"use strict";

let options = {};

if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "Spots",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                ownerId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: "Users",
                        key: "id"
                    },
                    onDelete: "CASCADE",
                    hooks: true
                },
                address: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                    unique: true
                },
                city: {
                    type: Sequelize.STRING(255),
                    allowNull: false
                },
                state: {
                    type: Sequelize.STRING(255),
                    allowNull: false
                },
                country: {
                    type: Sequelize.STRING(255),
                    allowNull: false
                },
                lat: {
                    type: Sequelize.DECIMAL,
                    allowNull: false
                },
                lng: {
                    type: Sequelize.DECIMAL,
                    allowNull: false
                },
                name: {
                    type: Sequelize.STRING(50),
                    allowNull: false
                },
                description: {
                    type: Sequelize.STRING(255),
                    allowNull: false
                },
                price: {
                    type: Sequelize.DECIMAL(6, 2),
                    allowNull: false
                },
                createdAt: {
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                    type: Sequelize.DATE
                },
                updatedAt: {
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                    type: Sequelize.DATE
                }
            },
            options
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Spots", options);
    }
};
