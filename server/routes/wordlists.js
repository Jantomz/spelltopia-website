const express = require("express");

const {
  createWordlist,
  getWordlist,
  getWordlists,
  deleteWordlist,
} = require("../controllers/wordlistController");

const router = express.Router();

router.post("/", createWordlist);

router.get("/:id", getWordlist);

router.get("/", getWordlists);

router.delete("/:id", deleteWordlist);

module.exports = router;
