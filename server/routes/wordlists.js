const express = require("express");

const {
  createWordlist,
  getWordlist,
  getWordlists,
  deleteWordlist,
  addUser,
  removeUser,
} = require("../controllers/wordlistController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// makes this authenticate the user before giving routes
router.use(requireAuth);

// POST new wordlist
router.post("/", createWordlist);

// GET a wordlist
router.get("/:id", getWordlist);

// GET wordlists
router.get("/", getWordlists);

// DELETE a wordlist
router.delete("/:id", deleteWordlist);

// UPDATE by POSTING user in a wordlist
router.patch("/add/:id", addUser);

// UPDATE by DELETING user in a wordlist
router.patch("/remove/:id", removeUser);

module.exports = router;
