"use strict";

let options = {};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "Reviews",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                userId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: "Users",
                        key: "id"
                    }
                },
                spotId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: "Users",
                        key: "id"
                    }
                },
                review: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                stars: {
                    type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("Reviews");
    }
};
