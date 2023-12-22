const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const validator = require("validator");
const Token = require("./tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

// static signup method
userSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password
) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // if it is valid email, it will be true, but then the ! reverses it
  if (!validator.isEmail(email)) {
    throw Error("Email is invalid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const type = "user";

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
    type,
  });

  const signupToken = await new Token({
    user_id: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  }).save();

  const url = `${process.env.BASE_URL}/${user._id}/${signupToken.token}`;
  await sendEmail(user.email, "Verify Email", url);

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  if (!user.verified) {
    const token = await Token.findOne({ user_id: user._id });
    if (!token) {
      const signupToken = await new Token({
        user_id: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const url = `${process.env.BASE_URL}/${user._id}/${signupToken.token}`;
      await sendEmail(user.email, "Verify Email", url);
    }
    throw Error("An Email has been sent to verify your email");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
