"use strict";

const { Spot } = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        await Spot.bulkCreate(
            [
                {
                    ownerId: 1,
                    address: "P Sherman 42 Wallaby Way",
                    city: "Sydney",
                    state: "Austate",
                    country: "Australia",
                    lat: -43.12432,
                    lng: 24.12312,
                    name: "Bobby",
                    description: "Comes with shrimp",
                    price: 4
                },
                {
                    ownerId: 2,
                    address: "1123 ghost ln",
                    city: "boogey",
                    state: "Texas",
                    country: "USA",
                    lat: 45.12132,
                    lng: -87.12312,
                    name: "Haunted Mansion",
                    description: "How long can you stay?",
                    price: 6
                },
                {
                    ownerId: 3,
                    address: "506 Terracotta Ln",
                    city: "Witchita",
                    state: "Texas",
                    country: "USA",
                    lat: 45.12132,
                    lng: -87.12312,
                    name: "Fabulous Castle",
                    description: "The king used to live here",
                    price: 600
                }
            ],
            { validate: true }
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("Spots");
    }
};
