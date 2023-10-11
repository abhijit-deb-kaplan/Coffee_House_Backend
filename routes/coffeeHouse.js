const express = require("express");
const { getCoffeeMenu } = require("../controllers/coffeeMenuController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all the coffee menu
router.get("/menu", verifyToken, getCoffeeMenu);

module.exports = router;
