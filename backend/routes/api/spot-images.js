const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Review, ReviewImage, User, SpotImage, Spot } = require("../../db/models");

const router = express.Router();

//Delete a Spot image
router.delete("/:imageId", requireAuth, async (req, res) => {
    try {
        const { imageId } = req.params;
        const { user } = req;


        //find the spot that the spotimage belongs to then use that spot.ownerId to authorize deletion
        const spot = await Spot.findAll({ include: SpotImage });

        const spotOwnerId = Spot.ownerId;

        console.log("spot", spot);

        // const spotImageToDelete = await SpotImage.findByPk(imageId);
        // const spotImageUserId = spotImageToDelete.dataValues.userId;
        // console.log("spotImageUserId", spotImageUserId);

        // //authorization check
        // if (user.id === spotImageUserId) {
        //     await spotImageToDelete.destroy();
        // } else {
        //     return res.status(403).json({
        //         "message": "Forbidden"
        //     });
        // }

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
