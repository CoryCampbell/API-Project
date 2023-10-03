const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { requireAuth } = require("../../utils/auth");
const { Spot } = require("../../db/models");

const router = express.Router();

router.get("/current", requireAuth, async (req, res) => {
    //return all spots owned by this user
    const yourSpots = await Spot.findByPk(1);
    res.json(yourSpots);
});

router.get("/", async (req, res) => {
    const allSpots = await Spot.findAll();
    res.json(allSpots);
});

module.exports = router;
