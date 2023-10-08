const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Review, ReviewImage, User, SpotImage, Spot } = require("../../db/models");

const router = express.Router();

//get all reviews of the Current User (written by current user)
router.get("/current", requireAuth, async (req, res) => {
    const { user } = req;


    const allReviews = await Review.findAll({
        where: {
            userId: user.id
        },
        include: [
            { model: User, attributes: ["id", "firstName", "lastName"] },
            {
                model: Spot,
                attributes: { exclude: ["description", "createdAt", "updatedAt"] },
                include: { model: SpotImage, attributes: ["url"], where: { preview: true } }
            },
            { model: ReviewImage, attributes: ["id", "url"] }
        ]
    });

    res.json({ "Reviews": allReviews });
});


module.exports = router;
