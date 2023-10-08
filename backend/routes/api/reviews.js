const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Review, ReviewImage, User, SpotImage, Spot } = require("../../db/models");

const router = express.Router();

//==================================================================================

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


//Edit a Review
router.put("/:reviewId", requireAuth, async (req, res) => {
    const { user } = req;
    const { reviewId } = req.params;
    const { review, stars } = req.body;

    //find the review that is getting an image
    //=========== this also checks that the review exists
    const reviewToUpdate = await Review.findByPk(reviewId);

    const errorsObj = {};

    if (!review) errorsObj.review = "Review text is required";
    if (!stars) errorsObj.stars = "Stars must be an integer from 1 to 5";

    if (errorsObj.review || errorsObj.stars)
        return res.status(400).json({
            "message": "Bad Request",
            "errors": errorsObj
        });

    try {
        //authorization check
        if (user.id === reviewToUpdate.userId) {
            await reviewToUpdate.update({
                review,
                stars
            });
            res.json(reviewToUpdate);
        } else {
            return res.status(403).json({
                "message": "Forbidden"
            });
        }
    } catch (error) {
        res.status(404).json({
            "message": "Review couldn't be found"
        });
    }
});

//delete a Review
router.delete("/:reviewId", requireAuth, async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { user } = req;
        const review = await Review.findByPk(reviewId);


        const reviewUserId = review.dataValues.userId;
        const reviewToDelete = await Review.findByPk(reviewId);

        //authorization check
        if (user.id === reviewUserId) {
            await reviewToDelete.destroy();
        } else {
            return res.status(403).json({
                "message": "Forbidden"
            });
        }

        res.json({
            "message": "Successfully deleted"
        });
    } catch (error) {
        res.status(404).json({
            "message": "Review couldn't be found"
        });
    }
});


module.exports = router;
