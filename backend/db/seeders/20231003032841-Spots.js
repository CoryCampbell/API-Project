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
                    state: "IDK",
                    country: "Australia",
                    lat: -43.12432,
                    lng: 24.12312,
                    name: "Dentist Office",
                    description:
                        "Comes with shrimp!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh mauris cursus mattis molestie a. Faucibus in ornare quam viverra orci. Donec massa sapien faucibus et molestie ac feugiat sed lectus. Augue mauris augue neque gravida in fermentum et sollicitudin ac. Velit egestas dui id ornare arcu odio ut sem. Cras ornare arcu dui vivamus. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Sagittis eu volutpat odio facilisis.",
                    price: 89
                },
                {
                    ownerId: 2,
                    address: "1123 ghost ln",
                    city: "Boogey",
                    state: "Texas",
                    country: "USA",
                    lat: 46.12132,
                    lng: -87.12312,
                    name: "Haunted Mansion",
                    description:
                        "How long can you stay? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh mauris cursus mattis molestie a. Faucibus in ornare quam viverra orci. Donec massa sapien faucibus et molestie ac feugiat sed lectus. Augue mauris augue neque gravida in fermentum et sollicitudin ac. Velit egestas dui id ornare arcu odio ut sem. Cras ornare arcu dui vivamus. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Sagittis eu volutpat odio facilisis.",
                    price: 69
                },
                {
                    ownerId: 3,
                    address: "506 Terracotta Ln",
                    city: "Witchytaw",
                    state: "Texas",
                    country: "USA",
                    lat: 45.12132,
                    lng: -87.12312,
                    name: "Fabulous Castle",
                    description:
                        "The king used to live here.. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh mauris cursus mattis molestie a. Faucibus in ornare quam viverra orci. Donec massa sapien faucibus et molestie ac feugiat sed lectus. Augue mauris augue neque gravida in fermentum et sollicitudin ac. Velit egestas dui id ornare arcu odio ut sem. Cras ornare arcu dui vivamus. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Sagittis eu volutpat odio facilisis.",
                    price: 600
                },
                {
                    ownerId: 4,
                    address: "507 Terracotta Ln",
                    city: "Witchertaw",
                    state: "Texas",
                    country: "USA",
                    lat: 46.12134,
                    lng: -87.12315,
                    name: "Fabulous Castle's neighbor. Just a plain house.",
                    description:
                        "The king used to live next door. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh mauris cursus mattis molestie a. Faucibus in ornare quam viverra orci. Donec massa sapien faucibus et molestie ac feugiat sed lectus. Augue mauris augue neque gravida in fermentum et sollicitudin ac. Velit egestas dui id ornare arcu odio ut sem. Cras ornare arcu dui vivamus. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Sagittis eu volutpat odio facilisis.",
                    price: 100
                },
                {
                    ownerId: 5,
                    address: "508 Terracotta Ln",
                    city: "Witchuhtah",
                    state: "Texas",
                    country: "USA",
                    lat: 45.12124,
                    lng: -87.17615,
                    name: "wow, a king used to live two doors down",
                    description:
                        "Maybe you might see some royalty. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh mauris cursus mattis molestie a. Faucibus in ornare quam viverra orci.",
                    price: 80
                },
                {
                    ownerId: 5,
                    address: "509 Terracotta Ln",
                    city: "Wytchyta",
                    state: "Texas",
                    country: "USA",
                    lat: 45.12455,
                    lng: -87.17699,
                    name: "wow, a king used to live three doors down",
                    description:
                        "Maybeeeee you might see some royalty. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh mauris cursus mattis molestie a. Faucibus in ornare quam viverra orci. Donec massa sapien faucibus et molestie ac feugiat sed lectus. Augue mauris augue neque gravida in fermentum et sollicitudin ac. Velit egestas dui id ornare arcu odio ut sem. Cras ornare arcu dui vivamus. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Sagittis eu volutpat odio facilisis.",
                    price: 60
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
