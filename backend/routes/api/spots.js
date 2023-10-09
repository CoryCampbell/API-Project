const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require("../../db/models");

const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const router = express.Router();

//get all Spots of the current user
router.get("/current", requireAuth, async (req, res) => {
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

        const spotPreviewImage = spotObj.dataValues.SpotImages[0].dataValues.previewImage;

            let sumOfRatings = 0;

            // get the sum of all the ratings for this spot
            jsonSpotObject.Reviews.forEach((review) => {
                sumOfRatings += review.avgRating;
            });

            // get the total count of reviews for this spot
            const reviewsCount = jsonSpotObject.Reviews.length;

        // calculate the avgRating
        jsonSpotObject.avgRating = sumOfRatings / reviewsCount;

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

    if (result[0]) {
        res.json({
            "Spots": result
        });
    } else {
        res.status(404).json({
            "message": "No Spots to show"
        });
    }
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
            attributes: ["spotId", "startDate", "endDate"]
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
    //pagination and query filters
    const { page = 1, size = 20, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    //query validations
    const paginationErrors = {};

    if (isNaN(+size) + size < 1 + size > 20) {
        paginationErrors.size = "Page must be greater than or equal to 1";
    }

    if (isNaN(+page) + page < 1 + page > 10) {
        paginationErrors.page = "Page must be greater than or equal to 1";
    }

    if (maxLat && isNaN(+maxLat)) {
        paginationErrors.maxLat = "Maximum latitude is invalid";
    }

    if (minLat && isNaN(+minLat)) {
        paginationErrors.minLat = "Minimum latitude is invalid";
    }

    if (maxLng && isNaN(+maxLng)) {
        paginationErrors.maxLng = "Maximum longitude is invalid";
    }

    if (minLng && isNaN(+minLng)) {
        paginationErrors.minLng = "Minimum longitude is invalid";
    }

    if (maxPrice && isNaN(+maxPrice) + maxPrice < 0) {
        paginationErrors.maxPrice = "Maximum price must be greater than or equal to 0";
    }

    if (minPrice && isNaN(+minPrice) + minPrice < 0) {
        paginationErrors.minPrice = "Minimum price must be greater than or equal to 0";
    }

    if (
        paginationErrors.page ||
        paginationErrors.size ||
        paginationErrors.minLat ||
        paginationErrors.maxLat ||
        paginationErrors.minLng ||
        paginationErrors.maxLng ||
        paginationErrors.minPrice ||
        paginationErrors.maxPrice
    ) {
        res.status(400).json({
            "message": "Bad Request",
            "errors": paginationErrors
        });
    }

    const where = {};
    const pagination = {};

    if (minLat && maxLat) {
        where.lat = { [Op.between]: [minLat, maxLat] };
    } else if (minLat) {
        where.lat = { [Op.gte]: minLat };
    } else if (maxLat) {
        where.lat = { [Op.lte]: maxLat };
    }

    if (minLng && maxLng) {
        where.lng = { [Op.between]: [minLng, maxLng] };
    } else if (minLng) {
        where.lng = { [Op.gte]: minLng };
    } else if (maxLng) {
        where.lng = { [Op.lte]: maxLng };
    }

    if (minPrice && maxPrice) {
        where.price = { [Op.between]: [minPrice, maxPrice] };
    } else if (minPrice) {
        where.price = { [Op.gte]: minPrice };
    } else if (maxPrice) {
        where.price = { [Op.lte]: maxPrice };
    }

    if (size > 20) size = 20;

    pagination.limit = size;
    pagination.offset = size * (page - 1);

    const paginatedSpots = await Spot.findAll({
        where: {
            ...where
        },
        ...pagination,
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

    //rest of get all spots^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    console.log("paginatedSpots", paginatedSpots);

    //refactor the results
    const result = [];

    paginatedSpots.forEach(async (spotObj) => {
        const jsonSpotObject = spotObj.toJSON();

        const spotPreviewImage = spotObj.dataValues.SpotImages[0].dataValues.previewImage;

        let sumOfRatings = 0;

        // get the sum of all the ratings for this spot
        jsonSpotObject.Reviews.forEach((review) => {
            sumOfRatings += review.avgRating;
        });

        // get the total count of reviews for this spot
        const reviewsCount = jsonSpotObject.Reviews.length;

        // calculate the avgRating
        jsonSpotObject.avgRating = sumOfRatings / reviewsCount;

        completeSpotObject = {
            id: spotObj.id,
            ownerId: spotObj.ownerId,
            address: spotObj.address,
            city: spotObj.city,
            state: spotObj.state,
            country: spotObj.country,
            lat: Number(spotObj.lat),
            lng: Number(spotObj.lng),
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
        "Spots": result,
        page: Number(page),
        size: Number(size)
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

//Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
    //Error response: Couldn't find a Spot with the specified id
    const numSpots = await Spot.count();
    if (isNaN(parseInt(req.params.spotId)) || req.params.spotId < 1 || req.params.spotId > numSpots) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const { user } = req;
    const { startDate, endDate } = req.body;

    //Error response: Body validation errors
    if (startDate >= endDate) {
        return res.status(400).json({
            message: "Bad Request",
            errors: { endDate: "endDate cannot be on or before startDate" }
        });
    }

    const bookings = await Booking.findAll({
        raw: true,
        where: { spotId: req.params.spotId }
    });

    const userEndDate = new Date(endDate).getTime();
    const userStartDate = new Date(startDate).getTime();

    const errorsObject = {};
    bookings.forEach((booking) => {
        const bookedEndDate = new Date(booking.endDate).getTime();
        const bookedStartDate = new Date(booking.startDate).getTime();

        if (userStartDate < bookedStartDate && bookedEndDate < userEndDate) {
            (errorsObject.startDate = "Start date conflicts with an existing booking"),
                (errorsObject.endDate = "End date conflicts with an existing booking");
        }

        if (userEndDate >= bookedStartDate && userEndDate <= bookedEndDate) {
            errorsObject.endDate = "End date conflicts with an existing booking";
        }

        if (userStartDate >= bookedStartDate && userStartDate <= bookedEndDate) {
            errorsObject.startDate = "Start date conflicts with an existing booking";
        }
    });

    if (errorsObject.startDate || errorsObject.endDate) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: { ...errorsObject }
        });
    }

    const currentSpot = await Spot.findByPk(req.params.spotId);

    //auth check
    if (currentSpot.ownerId != user.id) {
        const newBooking = await currentSpot.createBooking({
            userId: user.id,
            startDate,
            endDate
        });

        const allBookings = await Booking.findAll({ where: { userId: user.id } }, { attributes: ["id"] });

        console.log("allBookings", allBookings);

        const bookingObject = {
            id: newBooking.id,
            spotId: newBooking.spotId,
            userId: user.id,
            startDate: newBooking.startDate,
            endDate: newBooking.endDate,
            createdAt: newBooking.createdAt,
            updatedAt: newBooking.updatedAt
        };

        res.json(bookingObject);
    } else {
        //cannot book at your own spot
        return res.status(403).json({ message: "Forbidden" });
    }
});

//create a review for a spot based on the spots id
router.post("/:spotId/reviews", requireAuth, async (req, res) => {
    try {
        const { review, stars } = req.body;
        const { user } = req;
        const { spotId } = req.params;
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
                return res.status(500).json({
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
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const { user } = req;

    const errorsObject = {};

    if (!address) errorsObject.address = "Street address is required";
    if (!city) errorsObject.city = "City is required";
    if (!state) errorsObject.state = "State is required";
    if (!country) errorsObject.country = "Country is required";
    if (!lat || isNaN(lat)) errorsObject.lat = "Latitude is not valid";
    if (!lng || isNaN(lat)) errorsObject.lng = "Longitude is not valid";
    if (!name || name.length > 50) errorsObject.name = "Name must be less than 50 characters";
    if (!description) errorsObject.description = "Description is required";
    if (!price || price < 1) errorsObject.price = "Price per day is required";

    if (
        errorsObject.address ||
        errorsObject.city ||
        errorsObject.state ||
        errorsObject.country ||
        errorsObject.lat ||
        errorsObject.lng ||
        errorsObject.name ||
        errorsObject.description ||
        errorsObject.price
    )
        return res.status(400).json({
            "message": "Bad Request",
            "errors": errorsObject
        });

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

    const resObj = {
        id,
        ownerId,
        address,
        city,
        state,
        country,
        lat: Number(lat),
        lng: Number(lng),
        name,
        description,
        price
    };
    res.status(201).json(resObj);
});

//edit a spot
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
        if (!lat || isNaN(lat)) errorObj.lat = "Latitude is not valid";
        if (!lng || isNaN(lat)) errorObj.lng = "Longitude is not valid";
        if (!name || name.length > 50) errorObj.name = "Name must be less than 50 characters";
        if (!description) errorObj.description = "Description is required";
        if (!price || price < 1) errorObj.price = "Price per day is required";

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
                "message": "Bad Request",
                "errors": errorObj
            });

        res.json(spot);
    } catch (error) {
        res.status(404).json({
            "message": "Spot couldn't be found"
        });
    }
});

//delete a spot
router.delete("/:spotId", requireAuth, async (req, res) => {
    try {
        const { user } = req;
        const spotToDelete = await Spot.findByPk(req.params.spotId);
        const ownerId = spotToDelete.dataValues.ownerId;

        //authorization check
        if (user.id === ownerId) {
            await spotToDelete.destroy();
            res.status(200).json({
                "message": "Successfully deleted"
            });
        } else {
            return res.status(403).json({
                "message": "Forbidden"
            });
        }
    } catch (error) {
        res.status(404).json({ "message": "Spot couldn't be found" });
    }
});

module.exports = router;
