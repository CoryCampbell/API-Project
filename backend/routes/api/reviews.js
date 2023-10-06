const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Review, ReviewImage, User, SpotImage, Spot } = require("../../db/models");

const router = express.Router();

//get all reviews for current spot by userId
router.get("/current", requireAuth, async (req, res) => {
    const { user } = req;

    const reviewId = user.id;

    const allReviews = await Review.findAll({
        include: [
            { model: User, attributes: ["id", "firstName", "lastName"] },
            {
                model: Spot,
                attributes: { exclude: ["description", "createdAt", "updatedAt"] },
                include: { model: SpotImage, where: { preview: true } }
            },
            { model: ReviewImage, attributes: ["id", "url"] }
        ]
    });

    res.json({ "Reviews": allReviews });
});


module.exports = router;
