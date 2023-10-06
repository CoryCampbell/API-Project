"use strict";

let options = {};

if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "SpotImages",
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
                    unique: true,
                    references: {
                        model: "Spots",
                        key: "id"
                    }
                },
                url: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                preview: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                }
            },
            options
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("SpotImages", options);
    }
};
