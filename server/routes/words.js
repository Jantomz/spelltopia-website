const express = require("express");

const { getWords, createWord } = require("../controllers/wordController");

const router = express.Router();

router.get("/", getWords);

router.post("/", createWord);

module.exports = router;
