const mongoose = require("mongoose");

const Wordlist = require("../models/wordlistModel");
const Word = require("../models/wordModel");
var json = {};

const getWordlists = async (req, res) => {
  const user = req.user.email;

  json.assigned = await Wordlist.find({
    user,
  }).sort({
    createdAt: -1,
  }); // sorting in descending order

  json.owned = await Wordlist.find({ owner: user }).sort({
    createdAt: -1,
  });

  json.contributed = await Wordlist.find({ contributor: user }).sort({
    createdAt: -1,
  });
  res.status(200).json(json);
};

const createWordlist = async (req, res) => {
  const { title, owner } = req.body;

  let emptyFields = []; // validating the form inputs

  if (!title) {
    emptyFields.push("title");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    // wordlist.create() is asynchronous, it is calling the collection and using a method to create a document, the response we are promised is the new document that was created along with its ID
    const wordlist = await Wordlist.create({
      title,
      owner,
      visibility: "Private",
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

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such wordlist" });
  }

  const wordlist = await Wordlist.findById(id);

  if (!wordlist) {
    // have to return or else the rest of the code will be run
    return res.status(404).json({ error: "No such wordlist" });
  }

  res.status(200).json(wordlist);
};

const deleteWordlist = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such wordlist" });
  }

  // _id is the property name in MongoDB
  const wordlist = await Wordlist.findOneAndDelete({ _id: id });

  await Word.deleteMany({ wordlist_id: id });

  if (!wordlist) {
    return res.status(404).json({ error: "No such wordlist" });
  }

  res.status(200).json(wordlist);
};

const addUser = async (req, res) => {
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

const removeUser = async (req, res) => {
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

module.exports = {
  getWordlist,
  getWordlists,
  createWordlist,
  deleteWordlist,
  addUser,
  removeUser,
};
