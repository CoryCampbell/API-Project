const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { Spot } = require("../../db/models");

const router = express.Router();

router.get("/current", async (req, res) => {
    //authorize the current user
    //return all spots owned by this user
});

router.get("/", async (req, res) => {
    const allSpots = await Spot.findAll();
    res.json(allSpots);
});

module.exports = router;
