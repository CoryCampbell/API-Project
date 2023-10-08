const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Review, ReviewImage, User, SpotImage, Spot } = require("../../db/models");

const router = express.Router();

//===========================================================================================

//Delete a Review Image
router.delete("/:imageId", requireAuth, async (req, res) => {
    //
    const { imageId } = req.params;
    const { user } = req;

    try {
        //find the Review that the reviewImage belongs to then use that ownerId to authorize deletion
        const reviewImage = await ReviewImage.findByPk(imageId, {
            include: Review
        });

        const reviewImageUserId = reviewImage.Review.userId;

        //authorization check
        if (user.id === reviewImageUserId) {
            await reviewImage.destroy();

            res.json({
                "message": "Successfully deleted"
            });
        } else {
            return res.status(403).json({
                "message": "Forbidden"
            });
        }
    } catch (error) {
        res.status(404).json({
            "message": "Review Image couldn't be found"
        });
    }
});

module.exports = router;
