const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

const validateSignup = [
    check("email").exists({ checkFalsy: true }).withMessage("Invalid email"),

    check("username").exists({ checkFalsy: true }).withMessage("Username is required"),

    check("firstName").exists({ checkFalsy: true }).withMessage("First Name is required"),

    check("lastName").exists({ checkFalsy: true }).withMessage("Last Name is required"),

    check("password")
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage("Password must be 6 characters or more."),
    handleValidationErrors
];

// Sign up
router.post("/", validateSignup, async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    const errorObject = {};

    if (email === undefined) errorObject.email = "Invalid email";
    if (username === undefined) errorObject.username = "Username is required";
    if (firstName === undefined) errorObject.firstName = "First Name is required";
    if (lastName === undefined) errorObject.lastName = "Last Name is required";

    if (errorObject.email || errorObject.username || errorObject.firstName || errorObject.lastName)
        return res.json(errorObject);

    const user = await User.create({ email, username, firstName, lastName, hashedPassword });

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

module.exports = router;
