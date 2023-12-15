const express = require("express");

const router = express.Router();

// controller functions

const {
  loginUser,
  signupUser,
  getUser,
  getUsers,
} = require("../controllers/userController");

// login route

router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// GET user
router.get("/:email", getUser);

const requireAuth = require("../middleware/requireAuth");

// makes this authenticate the user before giving routes
router.use(requireAuth);

// GET users
router.get("/", getUsers);

module.exports = router;
