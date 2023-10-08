const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require("../../db/models");

const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const router = express.Router();

//get all reviews of the current user
router.get("/current", requireAuth, async (req, res) => {
    const { user } = req;

    const ownerId = user.id;

    const yourSpots = await Spot.findAll({
        where: {
            ownerId
        }
    });

    res.json(yourSpots);
});

//get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
    try {
        const { user } = req;

        const { spotId } = req.params;

        //result for NON OWNER
        const bookingsObjForNon = await Booking.findAll({
            where: {
                spotId
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "userId"]
            }
        });

        //result for OWNER
        // -needs id attribute in response
        const bookingsObjForOwner = await Booking.findAll({
            where: {
                spotId
            },
            include: [
                {
                    model: User,
                    attributes: ["id", "firstName", "lastName"]
                }
            ]
        });

        //refactor this into a for loop that checks each instance of the array for userId comparison and return true or false boolean if all match
        const userId = bookingsObjForOwner[0].dataValues.userId;

        if (user.id === userId) {
            res.json({
                "Bookings": bookingsObjForOwner
            });
        } else {
            res.json({
                "Bookings": bookingsObjForNon
            });
        }
    } catch (error) {
        res.status(404).json({
            "message": "Spot couldn't be found"
        });
    }
});

//get all reviews by a spotId
router.get("/:spotId/reviews", requireAuth, async (req, res) => {
    const spotId = req.params.spotId;

    const allReviews = await Review.findAll({
        where: {
            spotId
        },
        include: [
            { model: User, attributes: ["id", "firstName", "lastName"] },
            { model: ReviewImage, attributes: ["id", "url"] }
        ]
    });
    if (allReviews.toString() === "") return res.status(404).json({ message: "Spot couldn't be found" });

    res.json({ "Reviews": allReviews });
});

//get details of a spot from an id
router.get("/:spotId", async (req, res) => {
    try {
        const { spotId } = req.params;
        const spotDetails = await Spot.findByPk(spotId, {
            include: [
                { model: SpotImage, attributes: ["id", "url", "preview"] },
                { model: User, attributes: ["id", "firstName", "lastName"] }
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
    } catch (error) {
        res.status(404).json({
            message: "Spot couldn't be found"
        });
    }
});

//get all spots
router.get("/", async (req, res) => {
    const allSpots = await Spot.findAll();
    res.json(allSpots);
});

//add image to spot based on the spots id
router.post("/:spotId/images", requireAuth, async (req, res) => {
    try {
        const { url, preview } = req.body;

        const { spotId } = req.params;

        const newImage = await SpotImage.create({
            spotId,
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
    const { user } = req;

    const errorObj = {};

    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const { spotId } = req.params;

    try {
        const spot = await Spot.findByPk(spotId);

        //authorization check
        if (user.id === spot.ownerId) {
            await spot.update({
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
        } else {
            return res.status(403).json({
                "message": "Forbidden"
            });
        }

        if (!address) errorObj.address = "Street address is required";
        if (!city) errorObj.city = "City is required";
        if (!state) errorObj.state = "State is required";
        if (!country) errorObj.country = "Country is required";
        if (!lat) errorObj.lat = "Latitude is not valid";
        if (!lng) errorObj.lng = "Longitude is not valid";
        if (!name) errorObj.name = "Name must be less than 50 characters";
        if (!description) errorObj.description = "Description is required";
        if (!price) errorObj.price = "Price per day is required";

        if (
            errorObj.address ||
            errorObj.city ||
            errorObj.state ||
            errorObj.country ||
            errorObj.lat ||
            errorObj.lng ||
            errorObj.name ||
            errorObj.description ||
            errorObj.price
        )
            return res.json({
                "message": errorObj
            });

        res.json(spot);
    } catch (error) {
        res.status(400).json({
            "message": "Spot couldn't be found"
        });
    }
});

router.delete("/:spotId", requireAuth, async (req, res) => {
    try {
        const { spotId } = req.params;
        const { user } = req;

        const spotToDelete = await Spot.findByPk(spotId);

        console.log("spotToDelete", spotToDelete);
        const ownerId = spotToDelete.dataValues.ownerId;
        console.log("UserId:", user.id);
        console.log("ownerId", ownerId);

        //authorization check
        if (user.id === ownerId) {
            await spotToDelete.destroy({
                where: {
                    id: spotId
                }
            });
        } else {
            return res.status(403).json({
                "message": "Forbidden"
            });
        }

        res.status(200).json({
            "message": "Successfully deleted"
        });
    } catch (error) {
        res.status(404).json({ "message": "Spot couldn't be found" });
    }
});

module.exports = router;
