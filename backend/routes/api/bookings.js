const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Review, ReviewImage, User, SpotImage, Spot, Booking } = require("../../db/models");

const router = express.Router();

//get all of the Current User's Bookings
router.get("/current", requireAuth, async (req, res) => {
    //
    const { user } = req;
    const bookings = await Booking.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: Spot,
                attributes: { exclude: ["description", "createdAt", "updatedAt"] },
                include: SpotImage
            }
        ]
    });

    res.json({
        "Bookings": bookings
    });
});

module.exports = router;
