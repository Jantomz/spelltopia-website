const mongoose = require("mongoose");

const Word = require("../models/wordModel");

const getWords = async (req, res) => {
  const words = await Word.find({}).sort({ createdAt: -1 }); // sorting in descending order
  res.status(200).json(words);
};

const createWord = async (req, res) => {
  const {
    title,
    definition,
    partOfSpeech,
    etymology,
    sentence,
    pronunciation,
    audio,
    wordlist_id,
  } = req.body;

  let emptyFields = []; // validating the form inputs

  if (!title) {
    emptyFields.push("title");
  }

  if (!definition) {
    emptyFields.push("definition");
  }

  if (!partOfSpeech) {
    emptyFields.push("partOfSpeech");
  }

  if (!etymology) {
    emptyFields.push("etymology");
  }

  if (!sentence) {
    emptyFields.push("sentence");
  }

  if (!pronunciation) {
    emptyFields.push("pronunciation");
  }

  if (!audio) {
    emptyFields.push("audio");
  }

  if (!wordlist_id) {
    emptyFields.push("wordlist_id");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    // word.create() is asynchronous, it is calling the collection and using a method to create a document, the response we are promised is the new document that was created along with its ID
    const word = await Word.create({
      title,
      definition,
      partOfSpeech,
      etymology,
      sentence,
      pronunciation,
      audio,
      wordlist_id,
    });

    // this returns the response that the word was created
    // tacking on status 200 means the response was received and things were good, then the dot notation just sends the json format of the newly added document
    res.status(200).json(word);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getWord = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such word" });
  }

  const word = await Word.findById(id);

  if (!word) {
    // have to return or else the rest of the code will be run
    return res.status(404).json({ error: "No such word" });
  }

  res.status(200).json(word);
};

const updateWord = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such word" });
  }

  const word = await Word.findOneAndUpdate(
    { _id: id },
    {
      ...req.body, // spreading the properties of the body into this object, that is what the three dots are
    }
  );

  if (!word) {
    return res.status(404).json({ error: "No such word" });
  }

  // the returned word is the version before the update, so it will be updated in the db, but the 'word' json object will look not updated
  res.status(200).json(word);
};

const deleteWord = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such word" });
  }

  // _id is the property name in MongoDB
  const word = await Word.findOneAndDelete({ _id: id });

  if (!word) {
    return res.status(404).json({ error: "No such word" });
  }

  res.status(200).json(word);
};

const getWordlistWords = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such wordlist" });
  }

  // _id is the property name in MongoDB
  const words = await Word.find({ wordlist_id: id }).sort({ createdAt: -1 }); // sorting in descending order

  if (!words) {
    return res.status(404).json({ error: "Wordlist has no words" });
  }

  res.status(200).json(words);
};

module.exports = {
  getWords,
  createWord,
  getWord,
  updateWord,
  deleteWord,
  getWordlistWords,
};
