const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wordSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    definition: {
      type: String,
      required: true,
    },
    partOfSpeech: {
      type: String,
      required: true,
    },
    etymology: {
      type: String,
      required: true,
    },
    sentence: {
      type: String,
      required: true,
    },
    pronunciation: {
      type: String,
      required: true,
    },
    audio: {
      type: String,
      required: true,
    },
    wordlist_id: {
      type: String,
      required: true,
    },
  }, // this is a second property object, showing the timestamps of created and updated
  { timestamps: true }
);

module.exports = mongoose.model("Word", wordSchema);
