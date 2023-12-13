const express = require("express");

const {
  getWords,
  createWord,
  getWord,
  updateWord,
  deleteWord,
  getWordlistWords,
} = require("../controllers/wordController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// makes this authenticate the user before giving routes
router.use(requireAuth);

// GET the words
router.get("/", getWords);

// POST a new word
router.post("/", createWord);

// GET a word
router.get("/:id", getWord);

// PATCH a word
router.patch("/:id", updateWord);

// DELETE a word
router.delete("/:id", deleteWord);

// GEt wordlist words
router.get("/list/:id", getWordlistWords);

module.exports = router;
