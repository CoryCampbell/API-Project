"use strict";

const { ReviewImage } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

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
        await ReviewImage.bulkCreate(
            [
                {
                    reviewId: 1,
                    url: "https://www.herbeasleychevy.com/blogs/3828/wp-content/uploads/2021/04/nature-wichita-falls-tx.jpg"
                },
                {
                    reviewId: 2,
                    url: "https://www.herbeasleychevy.com/blogs/3828/wp-content/uploads/2021/04/nature-wichita-falls-tx.jpg"
                },
                {
                    reviewId: 3,
                    url: "https://www.herbeasleychevy.com/blogs/3828/wp-content/uploads/2021/04/nature-wichita-falls-tx.jpg"
                },
                {
                    reviewId: 4,
                    url: "https://www.herbeasleychevy.com/blogs/3828/wp-content/uploads/2021/04/nature-wichita-falls-tx.jpg"
                },
                {
                    reviewId: 5,
                    url: "https://www.herbeasleychevy.com/blogs/3828/wp-content/uploads/2021/04/nature-wichita-falls-tx.jpg"
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
        await queryInterface.bulkDelete("ReviewImages");
    }
};
