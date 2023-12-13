const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wordlistSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    contributor: {
      type: Array,
      required: false,
    },
    user: {
      type: Array,
      required: false,
    },
    visibility: {
      type: String,
      required: true,
    },
  }, // this is a second property object, showing the timestamps of created and updated
  { timestamps: true }
);

module.exports = mongoose.model("Wordlist", wordlistSchema);
