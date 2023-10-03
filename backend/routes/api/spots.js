const express = require("express");
const bcrypt = require("bcryptjs");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Spot } = require("../../db/models");
const router = express.Router();

const options = {};

router.get("/", async (req, res) => {
    const allSpots = await Spot.findAll();
    res.status(200).json(allSpots);
});

// router.get("/current", requireAuth, async (req, res) => {
//     const yourSpots = await Spot.findByPk();
// });

// router.get("/api/spots/:spotId", async (req, res) => {
//     const { spotId } = req.params;

//     const ownerSpots = await Spots.findByPk({
//         where: {
//             spotId
//         }
//     });
// });

// let spots = [];
// let images = [];

// router.post("/api/spots", async (req, res) => {});

module.exports = router;
