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
                    stars: 4
                },
                {
                    userId: 2,
                    spotId: 1,
                    review: "Wasnt quite what i was expecting but wow.",
                    stars: 1
                },
                {
                    userId: 3,
                    spotId: 1,
                    review: "Im coming back SOON!!!!",
                    stars: 4
                },
                {
                    userId: 4,
                    spotId: 1,
                    review: "MEH",
                    stars: 3
                },
                {
                    userId: 5,
                    spotId: 1,
                    review: "you wont regret it!",
                    stars: 5
                },
                {
                    userId: 1,
                    spotId: 2,
                    review: "This was kinda bland.",
                    stars: 1
                },
                {
                    userId: 2,
                    spotId: 2,
                    review: "WONT BE COMING BACK.",
                    stars: 1
                },
                {
                    userId: 3,
                    spotId: 2,
                    review: "GROSS",
                    stars: 1
                },
                {
                    userId: 4,
                    spotId: 2,
                    review: "MEH",
                    stars: 2
                },
                {
                    userId: 5,
                    spotId: 2,
                    review: "DONT WASTE YOUR TIME!",
                    stars: 1
                },
                {
                    userId: 1,
                    spotId: 3,
                    review: "decent",
                    stars: 3
                },
                {
                    userId: 2,
                    spotId: 3,
                    review: "mid",
                    stars: 3
                },
                {
                    userId: 3,
                    spotId: 3,
                    review: "ive had better, but ive had worse",
                    stars: 4
                },
                {
                    userId: 4,
                    spotId: 3,
                    review: "at least theres a pool",
                    stars: 3
                },
                {
                    userId: 5,
                    spotId: 3,
                    review: "good for its price",
                    stars: 3
                },
                {
                    userId: 1,
                    spotId: 4,
                    review: "top tier",
                    stars: 5
                },
                {
                    userId: 2,
                    spotId: 4,
                    review: "AMAZING EVERY YEAR",
                    stars: 5
                },
                {
                    userId: 3,
                    spotId: 4,
                    review: "Im coming back SOON!!!!",
                    stars: 5
                },
                {
                    userId: 4,
                    spotId: 4,
                    review: "WILL RETURN",
                    stars: 5
                },
                {
                    userId: 5,
                    spotId: 4,
                    review: "AMAZING",
                    stars: 5
                },
                {
                    userId: 1,
                    spotId: 5,
                    review: "great place but owners are rude.",
                    stars: 3
                },
                {
                    userId: 2,
                    spotId: 5,
                    review: "love it here",
                    stars: 5
                },
                {
                    userId: 3,
                    spotId: 5,
                    review: "found a bug in the fridge",
                    stars: 2
                },
                {
                    userId: 4,
                    spotId: 5,
                    review: "good area",
                    stars: 4
                },
                {
                    userId: 5,
                    spotId: 5,
                    review: "its aiiight",
                    stars: 3
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
