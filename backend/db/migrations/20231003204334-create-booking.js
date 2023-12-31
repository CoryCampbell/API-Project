"use strict";

let options = {};

if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "Bookings",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                spotId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: "Spots"
                    },
                    onDelete: "CASCADE"
                },
                userId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: "Users"
                    },
                    onDelete: "CASCADE"
                },
                startDate: {
                    type: Sequelize.DATEONLY,
                    allowNull: false
                },
                endDate: {
                    type: Sequelize.DATEONLY,
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
        await queryInterface.dropTable("Bookings", options);
    }
};
