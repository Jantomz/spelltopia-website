const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const Token = require("../models/tokenModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);
    const firstName = user.firstName;
    const lastName = user.lastName;
    const type = user.type;
    const _id = user._id;

    res.status(200).json({ _id, firstName, lastName, email, type, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.signup(firstName, lastName, email, password);

    // create a token
    const token = createToken(user._id);
    const type = user.type;
    const _id = user._id;

    res.status(200).json({ _id, firstName, lastName, email, type, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  const { email } = req.params;

  const user = await User.findOne({ email });

  if (!user) {
    // have to return or else the rest of the code will be run
    return res.status(404).json({ error: "No such user" });
  } else {
    return res.status(200).json(user);
  }
};

const getUsers = async (req, res) => {
  const user = await User.find({}).sort({ createdAt: -1 });

  if (!user) {
    // have to return or else the rest of the code will be run
    return res.status(404).json({ error: "No such user" });
  } else {
    return res.status(200).json(user);
  }
};

const verifyUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({ message: "Invalid link" });
    }

    const token = await Token.findOne({
      user_id: user._id,
      token: req.params.token,
    });
    if (!token) {
      return res.status(400).send({ message: "Invalid link" });
    }

    await User.findByIdAndUpdate({ _id: user._id }, { verified: true });

    await Token.findOneAndDelete({
      user_id: user._id,
      token: req.params.token,
    });

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { loginUser, signupUser, getUser, getUsers, verifyUser };
