"use strict";

const { Review } = require("../models");

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
        await Review.bulkCreate(
            [
                {
                    userId: 1,
                    spotId: 1,
                    review: "This was not Australia, but had a really nice bathroom.",
                    stars: 1
                },
                {
                    userId: 1,
                    spotId: 1,
                    review: "Wasnt quite what i was expecting but wow.",
                    stars: 5
                },
                {
                    userId: 2,
                    spotId: 2,
                    review: "Im coming back SOON!!!!",
                    stars: 5
                },
                {
                    userId: 2,
                    spotId: 2,
                    review: "MEH",
                    stars: 3
                },
                {
                    userId: 3,
                    spotId: 3,
                    review: "you wont regret it!",
                    stars: 5
                },
                {
                    userId: 3,
                    spotId: 3,
                    review: "I cant believe i met the king next door!",
                    stars: 5
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
        await queryInterface.bulkDelete("Reviews");
    }
};
