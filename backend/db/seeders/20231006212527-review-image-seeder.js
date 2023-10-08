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
                    url: "https://a0.muscache.com/im/pictures/13961863-496a-4d08-a1b1-11b00b84a0ca.jpg?im_w=720"
                },
                {
                    reviewId: 3,
                    url: "https://a0.muscache.com/im/pictures/miso/Hosting-830549192543827538/original/87ca1032-8fa4-48ce-b303-70ee156ab1ce.jpeg?im_w=720"
                },
                {
                    reviewId: 4,
                    url: "https://a0.muscache.com/im/pictures/83cd15ef-e9ec-4ab9-b071-3443e04aca86.jpg?im_w=720"
                },
                {
                    reviewId: 5,
                    url: "https://a0.muscache.com/im/pictures/e230b759-8ecc-4b1c-a903-b88b8eb6b907.jpg?im_w=720"
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
