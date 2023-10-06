const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, User, Review } = require("../../db/models");

const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");


const router = express.Router();

//return all spots owned by this user
router.get("/current", requireAuth, async (req, res) => {
    const { user } = req;

    const yourSpots = await Spot.findAll({
        where: {
            ownerId: user.id
        },
        include: [
            {
                model: SpotImage,
                as: "previewImage",
                attributes: ["url"]
            },
            {
                model: Review,
                as: "avgRating"
            }
        ]
    });

    // const result = yourSpots.toJSON();

    // const reviewCount = await Review.count();

    // const sumOfReviews = await Review.sum("stars", {
    //     where: {
    //         spotId
    //     }
    // });

    // result.numReviews = reviewCount;
    // result.avgRating = sumOfReviews / reviewCount;

    // res.json(result);

    res.json({ "Spots": yourSpots });
});

//get all reviews for current spot by spotId
router.get("/:spotId/reviews", requireAuth, async (req, res) => {
    const spotId = req.params.spotId;

    const allReviews = await Review.findAll({
        where: {
            spotId
        }
    });
    if (allReviews.toString() === "") return res.status(404).json({ message: "Spot couldn't be found" });

    res.json(allReviews);
});

//get details of a spot from an id
router.get("/:spotId", async (req, res) => {
    const { spotId } = req.params;
    const spotDetails = await Spot.findByPk(spotId, {
        include: [
            { model: SpotImage, as: "previewImage", attributes: ["id", "url", "preview"] },
            { model: User, as: "Owner", attributes: ["id", "firstName", "lastName"] }
        ]
    });

    const result = spotDetails.toJSON();

    const reviewCount = await Review.count({
        where: {
            spotId
        }
    });

    const sumOfReviews = await Review.sum("stars", {
        where: {
            spotId
        }
    });

    result.numReviews = reviewCount;
    result.avgRating = sumOfReviews / reviewCount;

    res.json(result);

    // catch (error) {
    //     res.status(404).json({
    //         message: "Spot couldn't be found"
    //     });
    // }
});

//get all spots
router.get("/", async (req, res) => {
    const allSpots = await Spot.findAll({
        include: [
            {
                model: SpotImage,
                as: "previewImage",
                attributes: ["url"]
            }
        ]
    });
    res.json({
        "Spots": allSpots
    });
});

//add new image to spot
router.post("/:spotId/images", requireAuth, async (req, res) => {
    try {
        const { url, preview } = req.body;

        const newImage = await SpotImage.create({
            url,
            preview
        });

        res.json(newImage);
    } catch (error) {
        res.status(404).json({
            "message": "Spot couldn't be found"
        });
    }
});

//create a review for a spot based on the spots id
// router.post("/:spotId/reviews", requireAuth, async (req, res) => {
//     try {
//         const { review, stars } = req.body;

//         const { spotId } = req.params;

//         const spot = await Spot.findByPk(spotId);

//         const newReview = await Review.create({
//             review,
//             stars
//         });

//         res.json(newReview);
//     } catch (error) {
//         res.status(404).json({
//             "message": "Spot couldn't be found"
//         });
//     }
// });

//create a new spot
router.post("/", requireAuth, async (req, res) => {
    try {
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
    } catch (error) {
        res.status(400).json({
            "message": "Bad Request",
            "errors": {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
        });
    }
});

//edit a spots information
router.put("/:spotId", requireAuth, async (req, res) => {
    const updatedSpotData = req.body;
    const { spotId } = req.params;

    try {
        const spot = await Spot.findByPk(spotId);

        await spot.update(updatedSpotData);

        res.json(spot);
    } catch (error) {
        res.status(400).json({
            "message": "Bad Request",
            "errors": {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
        });
    }
});

router.delete("/:spotId", requireAuth, async (req, res) => {
    const { spotId } = req.params;

    try {
        const spot = await Spot.findByPk(spotId);

        await spot.destroy();

        res.status(200).json({
            "message": "Successfully deleted"
        });
    } catch (error) {
        res.status(404).json({ "message": "Spot couldn't be found" });
    }
});

module.exports = router;
