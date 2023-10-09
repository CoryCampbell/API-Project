const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Review, ReviewImage, User, SpotImage, Spot, Booking } = require("../../db/models");

const router = express.Router();

//get all of the Current User's Bookings
router.get("/current", requireAuth, async (req, res) => {
    const { user } = req;
    const bookings = await Booking.findAll({
        where: {
            userId: user.id
        },
        attributes: ["id", "spotId", "userId", "startDate", "endDate", "createdAt", "updatedAt"],
        include: [
            {
                model: Spot,
                attributes: { exclude: ["description", "createdAt", "updatedAt"] },
                include: [{ model: SpotImage, attributes: ["url"] }]
            }
        ]
    });

    const result = [];

    bookings.forEach((booking) => {
        const bookingPreviewImage = booking.dataValues.Spot.dataValues.SpotImages[0].dataValues.url;

        const resObject = {
            id: booking.id,
            spotId: booking.spotId,
            Spot: {
                id: booking.Spot.id,
                ownerId: booking.Spot.ownerId,
                address: booking.Spot.address,
                city: booking.Spot.city,
                state: booking.Spot.state,
                country: booking.Spot.country,
                lat: booking.Spot.lat,
                lng: booking.Spot.lng,
                name: booking.Spot.name,
                price: booking.Spot.price,
                previewImage: bookingPreviewImage
            },
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        };

        result.push(resObject);
    });

    res.json({
        "Bookings": result
    });
});

//edit a booking
router.put("/:bookingId", requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const { bookingId } = req.params;
    const { user } = req;

    const newStartDate = new Date(startDate).getTime();
    const newEndDate = new Date(endDate).getTime();

    //body validations
    const errorsObj = {};

    if (!startDate) {
        errorsObj.startDate = "Please provide a valid Start Date";
    }
    if (!endDate) {
        errorsObj.endDate = "Please provide a valid End Date";
    }

    if (errorsObj.startDate || errorsObj.endDate) {
        return res.status(400).json({ "message": "Bad Request", "errors": errorsObj });
    }

    //end must come after start
    if (newEndDate < newStartDate) {
        return res.status(400).json({
            "message": "Bad Request",
            "errors": {
                "endDate": "endDate cannot come before startDate"
            }
        });
    }

    try {
        const booking = await Booking.findByPk(bookingId, {
            attributes: ["id", "spotId", "userId", "startDate", "endDate", "createdAt", "updatedAt"]
        });

        const bookingUserId = booking.dataValues.userId;
        console.log("bookingUserId", bookingUserId);

        //setup for date comparison
        let currentDate = new Date().getTime();

        //past date check
        console.log("newEndDate", newEndDate);
        console.log("currentDate", currentDate);
        if (newEndDate < currentDate) {
            return res.status(403).json({ "message": "Past bookings can't be modified" });
        }

        //get info for current bookings
        const currentBookings = await Spot.findAll({
            include: { model: Booking }
        });

        currentBookings.forEach((booking) => {
            console.log("booking", booking);
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

        //authorization check
        if (user.id === bookingUserId) {
            booking.update({
                startDate,
                endDate
            });
        } else {
            return res.status(403).json({
                "message": "Forbidden"
            });
        }

        res.json(booking);
    } catch (error) {
        res.status(404).json({
            "message": "Booking couldn't be found"
        });
    }
});

//delete a Booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { user } = req;
        const booking = await Booking.findByPk(bookingId, {
            attributes: ["id", "spotId", "userId", "startDate", "endDate", "createdAt", "updatedAt"]
        });

        console.log("booking", booking);
        const bookingUserId = booking.dataValues.userId;
        const bookingToDelete = await Booking.findByPk(bookingId);

        //setup for date comparison
        let currentDate = new Date().getTime();

        const parsedBookingStarted = new Date(booking.startDate).getTime();

        //check if booking has been started
        if (parsedBookingStarted < currentDate) {
            return res.status(403).json({
                "message": "Bookings that have been started can't be deleted"
            });
        }

        //authorization check
        if (user.id === bookingUserId) {
            await bookingToDelete.destroy();
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
            "message": "Booking couldn't be found"
        });
    }
});

module.exports = router;
