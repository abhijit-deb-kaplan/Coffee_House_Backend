const express = require("express");
const coffeeRoutes = require("../routes/coffeeHouse");
const userRoutes = require("../routes/user");

const router = express.Router();

router.use("/", coffeeRoutes);
router.use("/user", userRoutes);

module.exports = router;
