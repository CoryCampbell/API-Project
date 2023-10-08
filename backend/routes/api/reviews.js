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

//add image to a Review based on the Review's id
router.post("/:reviewId/images", requireAuth, async (req, res) => {
    try {
        const { url } = req.body;
        const { reviewId } = req.params;
        const { user } = req;

        //find the review that is getting an image
        //=========== this also checks that the review exists
        const review = await Review.findByPk(reviewId);

        //aggregate count on review.images
        const allReviewImages = await ReviewImage.count({
            where: {
                reviewId
            }
        });
        if (allReviewImages >= 10) {
            return res.status(403).json({
                "message": "Maximum number of images for this resource was reached"
            });
        }

        if (user.id === review.userId) {
            const newImage = await ReviewImage.create({
                reviewId,
                url
            });

            const newImageObject = newImage.toJSON();

            res.json({
                "id": newImageObject.id,
                "url": newImageObject.url
            });
        } else {
            res.status(403).json({
                "message": "Forbidden"
            });
        }
    } catch (error) {
        res.status(404).json({
            "message": "Review couldn't be found"
        });
    }
});


module.exports = router;
