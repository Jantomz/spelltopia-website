const express = require("express");

const router = express.Router();

const {
  getAllWordlists,
  createWordlist,
  getWordlist,
  getWordlists,
  deleteWordlist,
  updateWordlist,
  postUser,
  deleteUser,
  postContributor,
  deleteContributor,
  getWords,
  getWord,
  postWord,
  deleteWord,
  updateWord,
} = require("../controllers/wordlistController");
const requireAuth = require("../middleware/requireAuth");

// makes this authenticate the user before giving routes
router.use(requireAuth);

// GET all wordlists
router.get("/all", getAllWordlists);

// POST new wordlist
router.post("/", createWordlist);

// GET a wordlist
router.get("/:id", getWordlist);

// GET wordlists
router.get("/", getWordlists);

// DELETE a wordlist
router.delete("/:id", deleteWordlist);

// UPDATE a wordlist
router.patch("/:id", updateWordlist);

// POSTING user in a wordlist
router.post("/:id/user", postUser);

// DELETING user in a wordlist
router.delete("/:id/user", deleteUser);

// POSTING contributor in a wordlist
router.post("/:id/contributor", postContributor);

// DELETING user in a wordlist
router.delete("/:id/contributor", deleteContributor);

// GET a specific word of a specific wordlist
router.get("/:id/words/:word_id", getWord);

// POST word to a specific wordlist
router.post("/:id/words", postWord);

// DELETE a word from a specific wordlist
router.delete("/:id/words/:word_id", deleteWord);

// UPDATE a word from a specific wordlist
router.patch("/:id/words/:word_id", updateWord);

module.exports = router;
