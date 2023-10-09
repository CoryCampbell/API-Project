const router = require("express").Router();

const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const spotsRouter = require("./spots.js");
const reviewsRouter = require("./reviews.js");
const bookingsRouter = require("./bookings.js");
const spotImagesRouter = require("./spot-images.js");
const reviewImagesRouter = require("./review-images.js");

const { setTokenCookie } = require("../../utils/auth.js");
const { User, Spot } = require("../../db/models");
const { restoreUser, requireAuth } = require("../../utils/auth.js");

router.use(restoreUser);
router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/spots", spotsRouter);
router.use("/reviews", reviewsRouter);
router.use("/bookings", bookingsRouter);
router.use("/spot-images", spotImagesRouter);
router.use("/review-images", reviewImagesRouter);

//====================================================================

router.get("/restore-user", (req, res) => {
    return res.json(req.user);
});

router.get("/set-token-cookie", async (_req, res) => {
    const user = await User.findOne({
        where: {
            username: "Demo-lition"
        }
    });
    setTokenCookie(res, user);
    return res.json({ user: user });
});

router.get("/require-auth", requireAuth, (req, res) => {
    return res.json(req.user);
});

router.post("/test", function (req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;
