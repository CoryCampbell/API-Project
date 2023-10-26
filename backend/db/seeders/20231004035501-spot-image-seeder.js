"use strict";

const { SpotImage } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await SpotImage.bulkCreate(
            [
                {
                    spotId: 1,
                    url: "https://img.buzzfeed.com/buzzfeed-static/static/2015-08/17/14/enhanced/webdr09/enhanced-18682-1439836005-10.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto",
                    preview: true
                },
                {
                    spotId: 1,
                    url: "https://a0.muscache.com/im/pictures/miso/Hosting-785555433395150825/original/3226f0a6-74a1-4f8a-aafc-139fdffdc7c0.jpeg?im_w=720",
                    preview: false
                },
                {
                    spotId: 1,
                    url: "https://a0.muscache.com/im/pictures/miso/Hosting-785555433395150825/original/8c5ed2f9-33d4-41d2-9d8b-3907a29e7cc7.jpeg?im_w=720",
                    preview: false
                },
                {
                    spotId: 1,
                    url: "https://a0.muscache.com/im/pictures/miso/Hosting-785555433395150825/original/270eb07f-e341-43cd-b8ba-b18b0cc4e44d.jpeg?im_w=720",
                    preview: false
                },
                {
                    spotId: 1,
                    url: "https://a0.muscache.com/im/pictures/miso/Hosting-785555433395150825/original/f53cca19-1b2a-42cc-b8fc-f2b489609d85.jpeg?im_w=720",
                    preview: false
                },
                {
                    spotId: 2,
                    url: "https://thumbor.forbes.com/thumbor/fit-in/1290x/https://www.forbes.com/advisor/wp-content/uploads/2022/09/best_places_to_live_in_texas.jpeg.jpg",
                    preview: true
                },
                {
                    spotId: 2,
                    url: "https://a0.muscache.com/im/pictures/miso/Hosting-53819460/original/c0153db9-95c0-434a-a236-33b88bd2c6c3.jpeg?im_w=720",
                    preview: false
                },
                {
                    spotId: 2,
                    url: "https://a0.muscache.com/im/pictures/miso/Hosting-53819460/original/fc731047-6f2f-4f9d-8d81-d9feb3d65347.jpeg?im_w=720",
                    preview: false
                },
                {
                    spotId: 2,
                    url: "https://a0.muscache.com/im/pictures/miso/Hosting-53819460/original/28035f84-f017-4caa-9411-3dd69a4aee19.jpeg?im_w=720",
                    preview: false
                },
                {
                    spotId: 2,
                    url: "https://a0.muscache.com/im/pictures/miso/Hosting-53819460/original/259496fc-79ac-44f3-9201-e0732122af88.jpeg?im_w=720",
                    preview: false
                },
                {
                    spotId: 3,
                    url: "https://www.herbeasleychevy.com/blogs/3828/wp-content/uploads/2021/04/nature-wichita-falls-tx.jpg",
                    preview: true
                },
                {
                    spotId: 3,
                    url: "https://a0.muscache.com/im/pictures/7880c8d1-4a02-4f68-8b2f-d3b224526911.jpg?im_w=720",
                    preview: false
                },
                {
                    spotId: 3,
                    url: "https://a0.muscache.com/im/pictures/757c1428-14cb-492f-8d1d-4fc63a50a60e.jpg?im_w=720",
                    preview: false
                },
                {
                    spotId: 3,
                    url: "https://a0.muscache.com/im/pictures/8bebf8e2-1760-43b1-8717-7271c75099ae.jpg?im_w=720",
                    preview: false
                },
                {
                    spotId: 3,
                    url: "https://a0.muscache.com/im/pictures/9acce35a-de57-4540-9048-2509b26ecbea.jpg?im_w=720",
                    preview: false
                },
                {
                    spotId: 4,
                    url: "https://a0.muscache.com/im/pictures/miso/Hosting-638550295906956591/original/ade7c506-6805-448a-a209-bde97ca8547c.jpeg?im_w=720",
                    preview: true
                },
                {
                    spotId: 4,
                    url: "https://a0.muscache.com/im/pictures/miso/Hosting-685570463564839240/original/7e946a8e-3a92-46c0-8dfb-2d4ce8a8d392.jpeg?im_w=720",
                    preview: false
                },
                {
                    spotId: 4,
                    url: "https://a0.muscache.com/im/pictures/miso/Hosting-685570463564839240/original/704736b1-661b-4c90-8b67-e870ff83d367.jpeg?im_w=720",
                    preview: false
                },
                {
                    spotId: 4,
                    url: "https://a0.muscache.com/im/pictures/cdc91fef-3683-4f89-8b1d-8e1b032e0986.jpg?im_w=720",
                    preview: false
                },
                {
                    spotId: 4,
                    url: "https://a0.muscache.com/im/pictures/miso/Hosting-685570463564839240/original/4bffeffa-9b05-41eb-935b-f7649058385e.jpeg?im_w=720",
                    preview: false
                },
                {
                    spotId: 5,
                    url: "https://a0.muscache.com/im/pictures/73de3da2-3580-4d32-bf7a-04f9dc004af9.jpg?im_w=720",
                    preview: true
                },
                {
                    spotId: 5,
                    url: "https://a0.muscache.com/im/pictures/176d3404-a55a-480a-bd86-779540bfdee2.jpg?im_w=720",
                    preview: false
                },
                {
                    spotId: 5,
                    url: "https://a0.muscache.com/im/pictures/miso/Hosting-627531950828051522/original/c024ee6f-12b6-420e-835f-e80a72536052.jpeg?im_w=720",
                    preview: false
                },
                {
                    spotId: 5,
                    url: "https://a0.muscache.com/im/pictures/miso/Hosting-627531950828051522/original/041bd1c9-79bf-4b7c-b3b5-7c92a63f18d6.jpeg?im_w=720",
                    preview: false
                },
                {
                    spotId: 5,
                    url: "https://a0.muscache.com/im/pictures/miso/Hosting-627531950828051522/original/c423cd36-cbf9-4b8f-9724-dd5a2bce6653.jpeg?im_w=720",
                    preview: false
                },
                {
                    spotId: 6,
                    url: "https://a0.muscache.com/im/pictures/miso/Hosting-48000474/original/9857bb39-dd9d-483a-95b4-40dec03f48a7.jpeg?im_w=720",
                    preview: true
                },
                {
                    spotId: 6,
                    url: "https://a0.muscache.com/im/pictures/miso/Hosting-644013714686293940/original/9a12ec50-0d13-466f-a7d5-fabd5ea552f7.png?im_w=720",
                    preview: false
                },
                {
                    spotId: 6,
                    url: "https://a0.muscache.com/im/pictures/miso/Hosting-644013714686293940/original/d4b0d728-39ff-4040-8ddc-f507e11f60a6.jpeg?im_w=720",
                    preview: false
                },
                {
                    spotId: 6,
                    url: "https://a0.muscache.com/im/pictures/e87d710c-c15d-4bf3-875d-ae51fdd71de2.jpg?im_w=720",
                    preview: false
                },
                {
                    spotId: 6,
                    url: "https://a0.muscache.com/im/pictures/miso/Hosting-644013714686293940/original/faa5bd11-a8d0-4a43-95b6-dd76a8e84fb7.jpeg?im_w=720",
                    preview: false
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
