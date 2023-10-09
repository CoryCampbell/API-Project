const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require("../../db/models");

const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const router = express.Router();

//get all Spots of the current user
router.get("/current", requireAuth, async (req, res) => {
    //pagination and query filters
    const { page = 1, size = 20, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    

    //rest of get all spots^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    const { user } = req;

    const ownerId = user.id;

    const yourSpots = await Spot.findAll({
        where: {
            ownerId
        },
        include: [
            {
                model: Review,
                attributes: [["stars", "avgRating"]]
            },
            {
                model: SpotImage,
                attributes: [["url", "previewImage"]]
            }
        ]
    });

    //refactor the results
    const result = [];

    yourSpots.forEach(async (spotObj) => {
        const jsonSpotObject = spotObj.toJSON();
        // get avgRating of each spot
        // append avgRating to each spot
        // get previewImage url
        // append .previewImage = url
        // console.log("spotObj", spotObj);
        const spotPreviewImage = spotObj.dataValues.SpotImages[0].dataValues.previewImage;

        let sumOfRatings = 0;

        jsonSpotObject.Reviews.forEach((review) => {
            sumOfRatings += review.avgRating;
        });

        // get the total count of reviews for this spot
        const reviewsCount = jsonSpotObject.Reviews.length;

        // get the sum of all the ratings for this spot

        // calculate the avgRating
        jsonSpotObject.avgRating = sumOfRatings / reviewsCount;
        console.log("jsonSpotObject.avgRating", spotObj.avgRating);

        let completeSpotObject = {
            id: spotObj.id,
            ownerId: spotObj.ownerId,
            address: spotObj.address,
            city: spotObj.city,
            state: spotObj.state,
            country: spotObj.country,
            lat: spotObj.lat,
            lng: spotObj.lng,
            name: spotObj.name,
            description: spotObj.description,
            price: spotObj.price,
            createdAt: spotObj.createdAt,
            updatedAt: spotObj.updatedAt,
            avgRating: jsonSpotObject.avgRating || null,
            previewImage: spotPreviewImage
        };

        result.push(completeSpotObject);
    });

    res.json({
        "Spots": result
    });
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
            attributes: ["id", "spotId", "userId", "startDate", "endDate", "createdAt", "updatedAt"],
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
    } catch (error) {
        res.status(404).json({
            message: "Spot couldn't be found"
        });
    }
});

//get all spots
router.get("/", async (req, res) => {
    const allSpots = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: [["stars", "avgRating"]]
            },
            {
                model: SpotImage,
                attributes: [["url", "previewImage"]]
            }
        ]
    });

    //refactor the results
    const result = [];

    allSpots.forEach(async (spotObj) => {
        const jsonSpotObject = spotObj.toJSON();
        // get avgRating of each spot
        // append avgRating to each spot
        // get previewImage url
        // append .previewImage = url
        // console.log("spotObj", spotObj);
        const spotPreviewImage = spotObj.dataValues.SpotImages[0].dataValues.previewImage;

        let sumOfRatings = 0;

        jsonSpotObject.Reviews.forEach((review) => {
            sumOfRatings += review.avgRating;
        });

        // get the total count of reviews for this spot
        const reviewsCount = jsonSpotObject.Reviews.length;

        // get the sum of all the ratings for this spot

        // calculate the avgRating
        jsonSpotObject.avgRating = sumOfRatings / reviewsCount;
        console.log("jsonSpotObject.avgRating", spotObj.avgRating);

        completeSpotObject = {
            id: spotObj.id,
            ownerId: spotObj.ownerId,
            address: spotObj.address,
            city: spotObj.city,
            state: spotObj.state,
            country: spotObj.country,
            lat: spotObj.lat,
            lng: spotObj.lng,
            name: spotObj.name,
            description: spotObj.description,
            price: spotObj.price,
            createdAt: spotObj.createdAt,
            updatedAt: spotObj.updatedAt,
            avgRating: jsonSpotObject.avgRating || null,
            previewImage: spotPreviewImage
        };

        result.push(completeSpotObject);
    });

    res.json({
        "Spots": result
    });
});

//add image to spot based on the spots id
router.post("/:spotId/images", requireAuth, async (req, res) => {
    try {
        const { url, preview } = req.body;
        const { spotId } = req.params;
        const { user } = req;

        //find the spot that is getting an image
        //=========== this also checks that the spot exists
        const spot = await Spot.findByPk(spotId);

        if (user.id === spot.ownerId) {
            const newImage = await SpotImage.create({
                spotId,
                url,
                preview
            });

            const newImageObject = newImage.toJSON();

            res.json({
                "id": newImageObject.id,
                "url": newImageObject.url,
                "preview": true
            });
        } else {
            res.status(403).json({
                "message": "Forbidden"
            });
        }
    } catch (error) {
        res.status(404).json({
            "message": "Spot couldn't be found"
        });
    }
});

// Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
    try {
        const { spotId } = req.params;
        const { startDate, endDate } = req.body;
        const { user } = req;

        //find the spot that is being booked
        //=========== this also checks that the spot exists
        const spot = await Spot.findByPk(spotId, { include: Booking });
        const currentBookings = spot.dataValues.Bookings;
        const ownerId = spot.dataValues.ownerId;

        const newStartDate = new Date(startDate).getTime();

        const newEndDate = new Date(endDate).getTime();

        //body validations
        // const errorsObj = {};

        // if (!startDate) {
        //     errorsObj.startDate = "Please provide a valid Start Date";
        // }
        // if (!endDate) {
        //     errorsObj.endDate = "Please provide a valid End Date";
        // }

        // if (errorsObj.startDate || errorsObj.endDate) {
        //     return res.status(400).json({ "message": "Bad Request", "errors": errorsObj });
        // }

        //end must come after start
        //issues with single digit dates and date comparison
        if (newStartDate > newEndDate) {
            return res.status(400).json({
                "message": "Bad Request",
                "errors": {
                    "endDate": "endDate cannot come before startDate"
                }
            });
        }

        //authorization check
        //only create if user does NOT own the spot
        if (user.id !== ownerId) {
            currentBookings.forEach((booking) => {
                //setup for date comparisons
                const bookingStartDate = new Date(booking.dataValues.startDate).getTime();
                const bookingEndDate = new Date(booking.dataValues.endDate).getTime();

                //check if this spot has been booked for these dates
                const errorsObject = {};

                console.log("newStartDate", newStartDate);
                console.log("newEndDate", newEndDate);
                console.log("bookingStartDate", bookingStartDate);
                console.log("bookingEndDate", bookingEndDate);

                //start date is during a booking
                if (newStartDate >= bookingStartDate && newStartDate <= bookingEndDate) {
                    errorsObject.startDate = "Start date conflicts with an existing booking";
                }
                //end date is during a booking
                if (newEndDate >= bookingStartDate && newEndDate <= bookingEndDate) {
                    errorsObject.endDate = "End date conflicts with an existing booking";
                }

                if (newStartDate < bookingStartDate && newEndDate > bookingEndDate) {
                    errorsObject.startDate = "Start date conflicts with an existing booking";
                    errorsObject.endDate = "End date conflicts with an existing booking";
                }

                if (newStartDate === bookingStartDate) {
                    errorsObject.startDate = "Start date conflicts with an existing booking";
                }

                if (newEndDate === bookingEndDate) {
                    errorsObject.endDate = "End date conflicts with an existing booking";
                }

                if (errorsObject.startDate || errorsObject.endDate) {
                    res.status(403).json({
                        "message": "Sorry, this spot is already booked for the specified dates",
                        "errors": errorsObject
                    });
                }
            });

            const spot = await Spot.findByPk(spotId);

            // create the booking
            const newBooking = await spot.createBooking({
                userId: parseInt(user.id),
                startDate,
                endDate
            });

            console.log("newBooking", newBooking);

            const result = {
                id: newBooking.id,
                spotId: newBooking.spotId,
                userId: newBooking.userId,
                startDate: newBooking.startDate,
                endDate: newBooking.endDate,
                createdAt: newBooking.createdAt,
                updatedAt: newBooking.updatedAt
            };

            return res.json(result);
        } else {
            return res.status(403).json({
                "message": "Forbidden"
            });
        }
    } catch (error) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        });
    }
});

//create a review for a spot based on the spots id
router.post("/:spotId/reviews", requireAuth, async (req, res) => {
    try {
        const { review, stars } = req.body;
        const { user } = req;
        const { spotId } = req.params;
        const thisSpotId = spotId;
        const userId = user.id;

        //body validations errors
        const errorsObj = {};

        if (!review) errorsObj.review = "Review text is required";
        if (!stars) errorsObj.stars = "Stars must be an integer from 1 to 5";

        if (errorsObj.review || errorsObj.stars)
            return res.status(400).json({
                "message": "Bad Request",
                "errors": errorsObj
            });

        //403 error- each user can only leave ONE review on a spot
        //------ find all reviews where userId and check what spot they reviewed
        //--------- check array length and return error
        const thisSpot = await Spot.findByPk(spotId, {
            include: Review
        });

        const thisSpotsReviews = thisSpot.Reviews;

        thisSpotsReviews.forEach((review) => {
            console.log("review", review);
            if (review.dataValues.userId === user.id) {
                return res.status(403).json({
                    "message": "User already has a review for this spot"
                });
            }
        });

        //create the new review
        const newReview = await Review.create({
            spotId,
            userId,
            review,
            stars
        });
        res.status(201).json(newReview);
    } catch (error) {
        res.status(404).json({
            "message": "Spot couldn't be found"
        });
    }
});

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

        res.status(201).json(newSpot);
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

//delete a spot
router.delete("/:spotId", requireAuth, async (req, res) => {
    try {
        const { spotId } = req.params;
        const { user } = req;

        const spotToDelete = await Spot.findByPk(spotId);

        console.log("spotToDelete", spotToDelete);
        const ownerId = spotToDelete.dataValues.ownerId;

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
