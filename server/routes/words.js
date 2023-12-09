const express = require("express");

const {
  getWords,
  createWord,
  getWord,
  updateWord,
  deleteWord,
  getWordlistWords,
} = require("../controllers/wordController");

const router = express.Router();

router.get("/", getWords);

router.post("/", createWord);

router.get("/:id", getWord);

router.patch("/:id", updateWord);

router.delete("/:id", deleteWord);

router.get("/list/:id", getWordlistWords);

module.exports = router;
