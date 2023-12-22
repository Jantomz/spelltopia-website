const express = require("express");

const router = express.Router();

// controller functions

const {
  loginUser,
  signupUser,
  getUser,
  getUsers,
  verifyUser,
} = require("../controllers/userController");

// login route

router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// GET user
router.get("/:email", getUser);

// verify user
router.get("/:id/verify/:token", verifyUser);

const requireAuth = require("../middleware/requireAuth");

// makes this authenticate the user before giving routes
router.use(requireAuth);

// GET users
router.get("/", getUsers);

module.exports = router;
