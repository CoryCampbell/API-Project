const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

const validateLogin = [
    check("credential").exists({ checkFalsy: true }).notEmpty().withMessage("Email or username is required"),

    check("password").exists({ checkFalsy: true }).withMessage("Password is required"),
    handleValidationErrors
];

// Log in
router.post("/", validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;

    const errorObject = {};

    if (!credential) errorObject.message = "Email or username is required";
    if (!password) errorObject.message = "Password is required";

    if (errorObject.message || errorObject.password) return res.json(errorObject);

    const user = await User.unscoped().findOne({
        where: {
            [Op.or]: {
                username: credential,
                email: credential
            }
        }
    });

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = {};
        err.status = 401;
        err.message = "Invalid credentials";
        return next(err);
    }

    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
});

//get current user
router.get("/", (req, res) => {
    const { user } = req;
    if (user) {
        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        };
        return res.json({
            user: safeUser
        });
    } else return res.json({ user: null });
});

router.delete("/", (_req, res) => {
    res.clearCookie("token");
    return res.json({ message: "success" });
});

module.exports = router;
