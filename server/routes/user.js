const express = require("express");

const router = express.Router();

// controller functions

const {
  loginUser,
  signupUser,
  getUser,
} = require("../controllers/userController");

// login route

router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// get user
router.get("/:email", getUser);

module.exports = router;
