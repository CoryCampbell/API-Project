const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { requireAuth } = require("../../utils/auth");
const { Spot } = require("../../db/models");

const router = express.Router();

router.get("/current", requireAuth, async (req, res) => {
    const { user } = req;

    //return all spots owned by this user
    const yourSpots = await Spot.findAll({
        where: {
            ownerId: user.id
        }
    });
    res.json(yourSpots);
});

router.get("/:spotId", async (req, res) => {
    const { spotId } = req.params;

    const spotDetails = await Spot.findByPk(spotId);

    res.json(spotDetails);
});

router.get("/", async (req, res) => {
    const allSpots = await Spot.findAll();
    res.json(allSpots);
});

router.post("/", requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const { user } = req;

    const newSpot = await Spot.create({
        ownerId: user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    res.json(newSpot);
});

module.exports = router;
