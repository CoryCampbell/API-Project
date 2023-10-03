const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const bcrypt = require("b");

// const {};

router.get("/", async (req, res) => {
    const { spot } = req;

    const allSpots = await Spots.findAll();
    res.json(allSpots);
});

module.exports = router;
