"use strict";

const { Booking } = require("../models");
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

        await Booking.bulkCreate(
            [
                {
                    spotId: 1,
                    userId: 2,
                    startDate: "10/10/2024",
                    endDate: "10/17/2024"
                },
                {
                    spotId: 2,
                    userId: 3,
                    startDate: "10/10/2024",
                    endDate: "10/17/2024"
                },
                {
                    spotId: 3,
                    userId: 4,
                    startDate: "10/10/2024",
                    endDate: "10/17/2024"
                },
                {
                    spotId: 4,
                    userId: 5,
                    startDate: "10/10/2024",
                    endDate: "10/17/2024"
                },
                {
                    spotId: 5,
                    userId: 1,
                    startDate: "10/10/2021",
                    endDate: "10/17/2021"
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

        await queryInterface.bulkDelete("Bookings");
    }
};
