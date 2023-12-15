const mongoose = require("mongoose");

const Wordlist = require("../models/wordlistModel");

const getAllWordlists = async (req, res) => {
  const wordlists = await Wordlist.find({}).sort({ createdAt: -1 });

  if (wordlists) {
    res.status(200).json(wordlists);
  } else {
    res.status(400).json({ error: "Cannot retrieve wordlists" });
  }
};

const getWordlists = async (req, res) => {
  const user = req.user.email;
  let users = {};

  users.assigned = await Wordlist.find({
    user,
  }).sort({
    createdAt: -1,
  }); // sorting in descending order

  users.owned = await Wordlist.find({ owner: user }).sort({
    createdAt: -1,
  });

  users.contributed = await Wordlist.find({ contributor: user }).sort({
    createdAt: -1,
  });
  res.status(200).json(users);
};

const createWordlist = async (req, res) => {
  const { title } = req.body;
  const owner = req.user.email;

  try {
    // wordlist.create() is asynchronous, it is calling the collection and using a method to create a document, the response we are promised is the new document that was created along with its ID
    const wordlist = await Wordlist.create({
      title,
      owner,
      visibility: "Private",
      words: [],
    });

    // this returns the response that the word was created
    // tacking on status 200 means the response was received and things were good, then the dot notation just sends the json format of the newly added document
    res.status(200).json(wordlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getWordlist = async (req, res) => {
  const { id } = req.params;
  const { email } = req.user.email;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such wordlist" });
  }

  const wordlist = await Wordlist.findOne({ _id: id });

  if (!wordlist) {
    // have to return or else the rest of the code will be run
    return res.status(404).json({ error: "No such wordlist" });
  }

  res.status(200).json(wordlist);
};

const updateWordlist = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such wordlist" });
  }

  try {
    // wordlist.create() is asynchronous, it is calling the collection and using a method to create a document, the response we are promised is the new document that was created along with its ID
    const wordlist = await Wordlist.findOneAndUpdate({ _id: id }, { title });

    // this returns the response that the word was created
    // tacking on status 200 means the response was received and things were good, then the dot notation just sends the json format of the newly added document
    res.status(200).json(wordlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteWordlist = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such wordlist" });
  }

  // _id is the property name in MongoDB
  const wordlist = await Wordlist.findOneAndDelete({ _id: id });

  if (!wordlist) {
    return res.status(404).json({ error: "No such wordlist" });
  }

  res.status(200).json(wordlist);
};

const postUser = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such wordlist" });
  }

  // _id is the property name in MongoDB
  const wordlist = await Wordlist.findOneAndUpdate(
    { _id: id },
    { $push: { user: email } },
    { new: true }
  );

  if (!wordlist) {
    return res.status(404).json({ error: "No such wordlist" });
  }

  res.status(200).json(wordlist);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such wordlist" });
  }

  // _id is the property name in MongoDB
  const wordlist = await Wordlist.findOneAndUpdate(
    { _id: id },
    { $pull: { user: email } },
    { new: true }
  );

  if (!wordlist) {
    return res.status(404).json({ error: "No such wordlist" });
  }

  res.status(200).json(wordlist);
};

const postContributor = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such wordlist" });
  }

  // _id is the property name in MongoDB
  const wordlist = await Wordlist.findOneAndUpdate(
    { _id: id },
    { $push: { contributor: email } },
    { new: true }
  );

  if (!wordlist) {
    return res.status(404).json({ error: "No such wordlist" });
  }

  res.status(200).json(wordlist);
};

const deleteContributor = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such wordlist" });
  }

  // _id is the property name in MongoDB
  const wordlist = await Wordlist.findOneAndUpdate(
    { _id: id },
    { $pull: { contributor: email } },
    { new: true }
  );

  if (!wordlist) {
    return res.status(404).json({ error: "No such wordlist" });
  }

  res.status(200).json(wordlist);
};

const getWord = async (req, res) => {
  const { id, word_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such wordlist" });
  }

  // _id is the property name in MongoDB
  const word = await Wordlist.findOne({ _id: id }).findOne(
    { "words._id": word_id },
    { words: { $elemMatch: { _id: word_id } } }
  );

  if (!word) {
    return res.status(404).json({ error: "No such word" });
  }

  res.status(200).json(word.words[0]);
};

const postWord = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    definition,
    partOfSpeech,
    etymology,
    pronunciation,
    sentence,
    audio,
  } = req.body;

  const word = {
    title,
    definition,
    partOfSpeech,
    etymology,
    pronunciation,
    sentence,
    audio,
  };

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such wordlist" });
  }

  // _id is the property name in MongoDB
  const wordlist = await Wordlist.findOneAndUpdate(
    { _id: id },
    { $push: { words: word } },
    { new: true }
  );

  if (!wordlist) {
    return res.status(404).json({ error: "No such wordlist" });
  }

  res.status(200).json(wordlist);
};

const deleteWord = async (req, res) => {
  const { id, word_id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such wordlist" });
  }
  if (!mongoose.Types.ObjectId.isValid(word_id)) {
    return res.status(404).json({ error: "No such word" });
  }
  // _id is the property name in MongoDB
  const wordlist = await Wordlist.findOneAndUpdate(
    { _id: id },
    { $pull: { words: { _id: word_id } } },
    { new: true }
  );
  if (!wordlist) {
    return res.status(404).json({ error: "No such words" });
  }
  res.status(200).json(wordlist);
};

const updateWord = async (req, res) => {
  const { id, word_id } = req.params;
  const {
    title,
    definition,
    partOfSpeech,
    etymology,
    pronunciation,
    sentence,
    audio,
  } = req.body;

  const word = {
    _id: word_id,
    title,
    definition,
    partOfSpeech,
    etymology,
    pronunciation,
    sentence,
    audio,
  };

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such wordlist" });
  }

  if (!mongoose.Types.ObjectId.isValid(word_id)) {
    return res.status(404).json({ error: "No such word" });
  }

  await Wordlist.findOneAndUpdate(
    { _id: id },
    { $pull: { words: { _id: word_id } } }
  );

  const wordlist = await Wordlist.findOneAndUpdate(
    { _id: id },
    { $push: { words: word } },
    { new: true }
  );

  // _id is the property name in MongoDB

  if (!wordlist) {
    return res.status(404).json({ error: "No such wordlist" });
  }

  res.status(200).json(wordlist);
};

module.exports = {
  getAllWordlists,
  getWordlist,
  getWordlists,
  createWordlist,
  deleteWordlist,
  updateWordlist,
  postUser,
  deleteUser,
  postContributor,
  deleteContributor,
  getWord,
  postWord,
  deleteWord,
  updateWord,
};
