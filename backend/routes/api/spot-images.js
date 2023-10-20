const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Review, ReviewImage, User, SpotImage, Spot } = require("../../db/models");

const router = express.Router();


//DELETE A SPOT IMAGE
router.delete("/:imageId", requireAuth, async (req, res) => {

    const spotImageToDelete = await SpotImage.findByPk(req.params.imageId, { include: Spot });

    if (!spotImageToDelete) {
        return res.status(404).json({
            "message": "Spot Image couldn't be found"
        });
    }

    try {
        const spotImageUserId = spotImageToDelete.Spot.ownerId;
        const { user } = req;


        // authorization check
        if (user.id === spotImageUserId) {
            await spotImageToDelete.destroy();

            res.json({
                "message": "Successfully deleted"
            });
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
            "message": "Spot Image couldn't be found"
        });
    }
});

module.exports = router;
