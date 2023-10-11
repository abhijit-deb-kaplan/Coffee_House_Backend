const express = require("express");

// controller functions
const {
  loginUser,
  signupUser,
  logoutUser,
  loggedInUserDetails,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// logout route
router.post("/logout", logoutUser);

// loggedIn user details
router.get("/userdetails", verifyToken, loggedInUserDetails);

module.exports = router;
