"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await User.bulkCreate(
            [
                {
                    email: "demo@user.io",
                    firstName: "Demo",
                    lastName: "User",
                    username: "DemoUserDownBad",
                    hashedPassword: bcrypt.hashSync("password")
                },
                {
                    email: "dontmakemeangry@yahoo.com",
                    firstName: "Bruce",
                    lastName: "Banner",
                    username: "IamHulk",
                    hashedPassword: bcrypt.hashSync("password2")
                },
                {
                    email: "swimming@gmail.com",
                    firstName: "Malcolm",
                    lastName: "McCormick",
                    username: "MacMiller",
                    hashedPassword: bcrypt.hashSync("password3")
                },
                {
                    email: "hahahafunnyman@aol.com",
                    firstName: "William",
                    lastName: "Montgomery",
                    username: "TheBigRedMachine",
                    hashedPassword: bcrypt.hashSync("password4")
                },
                {
                    email: "jarvis01@hq.com",
                    firstName: "Tony",
                    lastName: "Stark",
                    username: "IronMan4Life",
                    hashedPassword: bcrypt.hashSync("password5")
                },
                {
                    email: "usemeforcreatingnewstuff@gmail.com",
                    firstName: "testerboy",
                    lastName: "reviewmaker",
                    username: "iteststuffgud",
                    hashedPassword: bcrypt.hashSync("password6")
                }
            ],
            { validate: true }
        );
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Users");
    }
};
