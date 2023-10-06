"use strict";

const { SpotImage } = require("../models");

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
        await SpotImage.bulkCreate(
            [
                {
                    spotId: 1,
                    url: "https://img.buzzfeed.com/buzzfeed-static/static/2015-08/17/14/enhanced/webdr09/enhanced-18682-1439836005-10.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto",
                    preview: true
                },
                {
                    spotId: 2,
                    url: "https://thumbor.forbes.com/thumbor/fit-in/1290x/https://www.forbes.com/advisor/wp-content/uploads/2022/09/best_places_to_live_in_texas.jpeg.jpg",
                    preview: true
                },
                {
                    spotId: 3,
                    url: "https://www.herbeasleychevy.com/blogs/3828/wp-content/uploads/2021/04/nature-wichita-falls-tx.jpg",
                    preview: true
                },
                {
                    spotId: 4,
                    url: "https://www.herbeasleychevy.com/blogs/3828/wp-content/uploads/2021/04/nature-wichita-falls-tx.jpg",
                    preview: true
                },
                {
                    spotId: 5,
                    url: "https://www.herbeasleychevy.com/blogs/3828/wp-content/uploads/2021/04/nature-wichita-falls-tx.jpg",
                    preview: true
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
        await queryInterface.bulkDelete("SpotImages");
    }
};
