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

        await Spot.bulkCreate([
            {
                ownerId: 1,
                address: "P Sherman 42 Wallaby Way",
                city: "Sydney",
                state: "Uhhh",
                country: "AFJLK",
                lat: -43.12432,
                lng: 24.12312,
                name: "sadfasd",
                description: "sadfasdf",
                price: 4,
                avgRating: 1,
                previewImage:
                    "https://upload.wikimedia.org/wikipedia/commons/0/01/Avenida_Raimundo_da_Silva_Barros.jpeg"
            },
            {
                ownerId: 2,
                address: "sdafsadf 1123 ln",
                city: "asdffasd",
                state: "rqewqwer",
                country: "asdfasdf",
                lat: 45.12132,
                lng: -87.12312,
                name: "sdfaasdf",
                description: "sadfsdadfsaasdfd sdaffsdafdas fsdadsaf",
                price: 6,
                avgRating: 2,
                previewImage:
                    "https://upload.wikimedia.org/wikipedia/commons/9/98/North_Pole%2C_Alaska_-_aerial_view_-_P1040581.jpg"
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await Spot.bulkDelete("Spots");
    }
};
