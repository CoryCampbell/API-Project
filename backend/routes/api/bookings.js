const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Review, ReviewImage, User, SpotImage, Spot, Booking, Sequelize } = require("../../db/models");

const router = express.Router();

//get all of the Current User's Bookings
router.get("/current", requireAuth, async (req, res) => {
    const { user } = req;
    const bookings = await Booking.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: Spot,
                attributes: { exclude: ["description", "createdAt", "updatedAt"] },
                include: SpotImage
            }
        ]
    });

    res.json({
        "Bookings": bookings
    });
});

//edit a booking
router.put("/:bookingId", requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const { bookingId } = req.params;
    const { user } = req;

    //parsing of new edit dates for comparisons
    const newStartDate = startDate;
    const newEndDate = endDate;
    const parsedStartDate = Date.parse(newStartDate);
    const parsedEndDate = Date.parse(newEndDate);

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
    if (parsedEndDate < parsedStartDate) {
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

        //setup for date comparison
        let currentDate = new Date().toJSON().slice(0, 10);

        const parsedCurrentDate = Date.parse(Date(currentDate));

        //past date check
        if (parsedEndDate < parsedCurrentDate) {
            return res.status(403).json({ "message": "Past bookings can't be modified" });
        }

        const dateConflicts = {};

        const tryBookingStart = parsedStartDate;
        const tryBookingEnd = parsedEndDate;

        //get info for current bookings
        const currentBookings = await Spot.findAll({
            include: { model: Booking }
        });

        currentBookings.forEach((spot) => {
            console.log("LOOK ====>", spot);

            //already booked that date check
            if (booking.startDate) {
                console.log("BOOKED ALREADY TEST");
            }
            //endDate already booked
            // if (bookedAt)
            //startDate already booked
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
        let currentDate = new Date().toJSON().slice(0, 10);
        const parsedCurrentDate = Date.parse(Date(currentDate));
        console.log("parsedCurrentDate", parsedCurrentDate);

        const parsedBookingStarted = Date.parse(booking.startDate);
        console.log("parsedBookingsStarted", parsedBookingStarted);

        if (parsedBookingStarted < parsedCurrentDate) {
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
