const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

//
router.get("/current", requireAuth, async (req, res) => {
    //
});

//

//

//

//
module.exports = router;
