const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Review } = require("../../db/models");

const router = express.Router();

//get all reviews for current spot by userId
router.get("/current", requireAuth, async (req, res) => {
    try {
        const { user } = req;

        const reviewId = user.id;
        const allReviews = await Review.findAll({
            where: {
                spotId: reviewId
            }
        });
        res.json(allReviews);
    } catch (error) {
        res.status(404).json({
            "message": "Spot couldn't be found"
        });
    }
});


module.exports = router;
