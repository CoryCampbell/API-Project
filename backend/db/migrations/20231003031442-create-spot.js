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
                        model: "Users"
                    },
                    onDelete: "CASCADE"
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
                    type: Sequelize.TEXT,
                    allowNull: false
                },
                description: {
                    type: Sequelize.TEXT,
                    allowNull: false
                },
                price: {
                    type: Sequelize.DECIMAL(6, 2),
                    allowNull: false
                },
                createdAt: {
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                    type: Sequelize.DATEONLY
                },
                updatedAt: {
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                    type: Sequelize.DATEONLY
                }
            },
            options
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Spots", options);
    }
};
