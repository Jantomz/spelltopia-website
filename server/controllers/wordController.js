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
    wordlist,
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

  if (!wordlist) {
    emptyFields.push("wordlist");
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
      wordlist,
    });

    // this returns the response that the word was created
    // tacking on status 200 means the response was received and things were good, then the dot notation just sends the json format of the newly added document
    res.status(200).json(word);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getWords,
  createWord,
};
